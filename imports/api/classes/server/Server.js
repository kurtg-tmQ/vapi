import { Meteor } from 'meteor/meteor';
import yaml from "js-yaml";
import Path from './Path';
import fs from 'fs';

import { RedisClient } from "./RedisClient";
import DB, { INDEXES } from "../../DB";
import Utilities from './Utilities';
import RedisVent from "./RedisVent";
import { PubSub } from "./PubSub";
import { Vapi } from "./VAPI";

class Server {
    #settings;
    #redisClient;
    #vapi;
    #redisPubSub;
    constructor(settings) {
        this.#settings = settings;
        this.readConfig(Path.CONFIG + "settings.yml");
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
            await Promise.all([this.registerIndexes(), this.startRedis()]);
            if (this.Config.vapi)
                this.#vapi = new Vapi(this.Config.vapi.orgId, this.Config.vapi.key, this.Config.host);
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
}

export default new Server(Meteor.settings);