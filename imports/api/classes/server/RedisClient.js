import { createClient } from "redis";

import Utilities from "./Utilities";

export class RedisClient {
    #instance = null;
    #_onReady = () => { };
    constructor(settings) {
        if (!settings || !settings.host || !settings.port) throw new Error("No Redis configuration!");
        let config = {
            socket: {
                port: settings.port,
                host: settings.host
            }
        };
        if (settings.password && settings.password.trim())
            config.options = {
                password: settings.password
            };
        this.#instance = createClient(config);
        this.#instance.on("error", (err) => {
            Utilities.showError("Redis Client Error! (err: %s)", err);
        });
        this.#instance.on("ready", () => this.#_onReady());
        this.#instance.connect();
    }
    onReady(func) {
        if (typeof func == "function")
            this.#_onReady = func;
    }
    get Instance() {
        return this.#instance;
    }
    /**
     * 
     * @param {String} key 
     * @returns {Promise<String>}
     */
    get(key) {
        return this.#instance.get(key);
    }
    /**
     * 
     * @param {String} key 
     * @param {String} value 
     * @returns {Promise}
     */
    set(key, value) {
        return this.#instance.set(key, value);
    }
    del(key) {
        return this.#instance.del(key);
    }
    hset(name, key, value) {
        return this.#instance.hSet(name, key, value);
    }
    hget(name, key) {
        return this.#instance.hGet(name, key);
    }
    hdel(name, key) {
        return this.#instance.hDel(name, key);
    }
    hexists(name, key) {
        return this.#instance.hExists(name, key);
    }
    hgetall(name) {
        return this.#instance.hGetAll(name);
    }
    /**
     * 
     * @param {String} group 
     * @param {String} member 
     * @returns {Promise}
     */
    lpush(group, member) {
        return this.#instance.LPUSH(group, member);
    }
    /**
     * 
     * @param {String} group 
     * @param {String} member 
     * @returns {Promise}
     */
    rpush(group, member) {
        return this.#instance.RPUSH(group, member);
    }
    /**
     * 
     * @param {String} group 
     * @param {Number} start 
     * @param {Number} end 
     * @returns {Promise<String>}
     */
    lrange(group, start, end) {
        return this.#instance.LRANGE(group, start, end);
    }
    /**
     * 
     * @param {String} group 
     * @returns {Promise<Number>}
     */
    llen(group) {
        return this.#instance.LLEN(group);
    }
    /**
     * 
     * @param {String} group 
     * @param {Number} count
     * @param {String} value
     * @returns {Promise}
     */
    lrem(group, count, value) {
        return this.#instance.LREM(group, count, value);
    }
    /**
     * 
     * @param {String} group 
     * @returns {Promise}
     */
    lpop(group) {
        return this.#instance.LPOP(group);
    }
}
