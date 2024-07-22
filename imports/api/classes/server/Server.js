import { Meteor } from 'meteor/meteor';
import yaml from "js-yaml";
import Path from './Path';
import fs from 'fs';

import DB, { INDEXES, Business, Channels, Consumer, Pools } from "../../DB";
import { RedisClient } from "./RedisClient";
import { RemoteDatabase } from "../../RemoteDB";
import Utilities from './Utilities';
import RedisVent from "./RedisVent";
import { PubSub } from "./PubSub";
import { Vapi } from "./VAPI";
import OpenAi from './openai/KnowledgeGenerator';
import startWebSocketServer from './websocket/Socket';

class Server {
    #settings;
    #redisClient;
    #vapi;
    #redisPubSub;
    #functions = {};
    #remoteDB;
    #openai;
    constructor(settings) {
        this.#settings = settings;
        this.readConfig(Path.CONFIG + "settings.yml");
        this.#openai = new OpenAi(this.Config.openai);
    }
    get Config() {
        return this.#settings;
    }
    /**
     * @returns {RedisClient}
     */
    get RedisClient() {
        return this.#redisClient;
    }
    /**
     * @returns {Vapi}
     */
    get Vapi() {
        return this.#vapi;
    }
    /**
    * @type {PubSub}
    */
    get RedisPubSub() {
        return this.#redisPubSub;
    }
    registerFunctions() {
        Meteor.methods(this.#functions);
    }
    /**
     * @returns {RemoteDatabase}
     */
    get RemoteDB() {
        return this.#remoteDB;
    }
    /**
     * 
     * @param {String} name 
     * @param {Function} func 
     */
    addFunction(name, func) {
        if (typeof func != "function") throw new Error("func not a function");
        if (this.#functions[name]) throw new Error(`function "${name}" is already registered`);
        this.#functions[name] = func;
    }
    /**
   * Read configuration file
   * @param {String} path
   */
    readConfig(path) {
        const merge = (old, new_) => {
            if (typeof old == "object") {
                for (let key in old) if (typeof new_[key] != "undefined") old[key] = merge(old[key], new_[key]);
                if (typeof new_ == "object") for (let key in new_) if (typeof old[key] == "undefined") old[key] = new_[key];
            } else if (old instanceof Array) {
                old.concat(new_);
            } else return new_;
            return old;
        };
        Utilities.showNotice("Reading configuration... file: %s", path);
        if (fs.existsSync(path)) {
            try {
                const doc = yaml.load(fs.readFileSync(path, "utf8"));
                this.#settings = merge(this.#settings, doc);
                Utilities.showStatus("Done reading configuration!");
            } catch (err) {
                throw new Error("Missing configuration! err: " + err.message);
            }
        } else throw new Error("Missing configuration! err: " + path + " not found");
    }
    async startup(banner) {
        try {
            if (banner) Utilities.log("\n " + banner);
            Utilities.showStatus("Starting up server...");
            startWebSocketServer();
            await Promise.all([this.registerIndexes(), this.startRedis()]);
            if (this.Config.vapi)
                this.#vapi = new Vapi(this.Config.vapi.orgId, this.Config.vapi.key, this.Config.host, this.Config.phoneId, this.#openai);
            if (this.Config.remoteDB)
                this.#remoteDB = new RemoteDatabase(this.Config.remoteDB.name, this.Config.remoteDB.uri);
            this.createDefaultData();
        } catch (error) {
            Utilities.showError("Error starting up server! err: %s", error.message);
        }
    }
    async registerIndexes() {
        try {
            let list = [];
            Utilities.showNotice("Registering DB indexes...");
            for (let key in INDEXES) {
                if (!INDEXES[key].length) continue;
                for (let idx in INDEXES[key]) {
                    if (!DB[key]) {
                        Utilities.showError("Cannot create index for `%s`, not found!", key);
                        continue;
                    }
                    list.push(DB[key].rawCollection().createIndex(INDEXES[key][idx].key, INDEXES[key][idx].option));
                }
            }
            await Promise.all(list);
            return Utilities.showStatus("DB indexes are now set!");
        } catch (error) {
            return Utilities.showError("registerIndexes ", error.message || error);
        }
    }
    startRedis() {
        return new Promise((resolve) => {
            Utilities.showNotice("Connecting to Redis server... (server: %s:%s)", this.Config.redisOplog.redis.host, this.Config.redisOplog.redis.port);
            this.#redisClient = new RedisClient(this.Config.redisOplog.redis);
            this.RedisClient.onReady(
                Meteor.bindEnvironment(() => {
                    RedisVent.publish();
                    this.#redisPubSub = new PubSub();
                    this.RedisPubSub.poolResponse();
                    resolve(Utilities.showStatus("Redis ready!"));
                })
            );
        });
    }
    async verifyBearer(userId, password) {
        try {
            const user = DB.Users.findOne({ _id: userId });
            if (!user) throw new Error("No User Found");
            if (user.token !== password) throw new Error("Invalid Token");
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }


    async createDefaultData() {
        if (DB.Pools.find().count() === 0) {
            const pools = this.Config.pools;
            const registeredPhones = await this.Vapi.listPhoneNumbers();
            console.log("Registered Phone", registeredPhones)
            console.log("ppols", pools)
            let poolItem = []
            pools.forEach(pool => {
                const match = registeredPhones.find(phone => phone.number === pool.number);
                if (match) {
                    poolItem.push(match);
                }
            });
            console.log("Pool Item", poolItem)
            if (poolItem && poolItem.length) {
                for (const poolMember of poolItem) {
                    const pl = new Pools({
                        id: poolMember.id,
                        orgId: poolMember.orgId,
                        assistantId: poolMember.assistantId,
                        number: poolMember.number,
                        twilioAccountSid: poolMember.twilioAccountSid,
                        twilioAuthToken: poolMember.twilioAuthToken,
                        name: poolMember.name,
                        provider: poolMember.provider,
                    });
                    pl.save()
                }
            }
            this.Vapi.initPools();
        }

        if (DB.Business.find().count()) {
            Utilities.showStatus("Default data already exists!");
            return;
        }
        const business = new Business({
            name: "Default Business",
            address: "1234 Main St. Anytown, USA",
        });
        business.save();

        const channels = this.Config.channels;
        if (channels && channels.length) {
            for (const channel of channels) {
                const ch = new Channels({
                    businessId: business._id,
                    number: channel.number,
                    api: {
                        key: channel.key,
                        secret: channel.secret,
                        network: channel.network,
                    },
                });
                ch.save();
            }
        }
        const consumers = this.Config.consumers;
        if (consumers && consumers.length) {
            for (const consumer of consumers) {
                const cons = new Consumer({
                    businessId: business._id,
                    firstName: consumer.firstName,
                    lastName: consumer.lastName,
                    birthday: consumer.birthday,
                    zipCode: consumer.zipCode,
                    account: consumer.account,
                    contactInfo: consumer.contactInfo,
                    security: consumer.security
                });
                cons.save();
            }
        }
        Utilities.showStatus("Default data created!");
    }
}

export default new Server(Meteor.settings);