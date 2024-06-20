import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { Meteor } from "meteor/meteor";
import Utilities from "./Utilities";
import Server from "./Server";

export class PubSub {
    #subscriber;
    #pool = [];
    constructor() {
        this.#subscriber = Server.RedisClient.Instance.duplicate();
        this.#subscriber.on("error", (err) => {
            Utilities.showError("Redis Client Subscriber Error! (err: %s)", err);
        });
        this.#subscriber.connect();
    }
    poolResponse() {
        Meteor.setTimeout(() => {
            if (this.#pool.length) {
                const current = this.#pool.pop();
                if (current)
                    if (current.cd < moment().valueOf()) {
                        current.cd = moment().add(30, "seconds").valueOf();
                        Server.RedisClient.Instance.publish(current.channelString, current.message);
                    } else {
                        current && this.#pool.push(current);
                    }
            }
            this.poolResponse();
        }, 1500);
    }
    clearPool(ids) {
        for (const idx in ids) {
            for (const pid in this.#pool) {
                if (this.#pool[pid].pid == ids[idx]) {
                    this.#pool.splice(pid, 1);
                    break;
                }
            }
        }
    }
    /**
     * Start subscriptions
     * @param {Object<string,Function>}
     * @returns {Promise}
     */
    startSub(commands) {
        return new Promise((resolve) => {
            this.#subscriber.on("ready", () => {
                resolve();
                for (const cmd in commands)
                    this.subscribe(cmd, commands[cmd]);
                // this.subscribe(`ACK${Server.ServerID}`, ACK);
            });
        });
    }
    /**
     * Subscribe to a channel
     * @param {String} channelString 
     * @param {Function} callback 
     */
    subscribe(channelString, callback) {
        this.#subscriber.subscribe(channelString, (message, command) => {
            try {
                Utilities.showNotice("Server Command executed! cmd: %s", command);
                callback(JSON.parse(message));
            } catch (err) {
                Utilities.showWarning("Failed to parse server command! cmd: %s msg: %s err: %s", command, message, err.message);
            }
        });
    }

    /**
     * Trigger Redis subscriptions
     * @param {String} channelString 
     * @param {Object} message 
     * @returns {Promise}
     */
    publish(channelString, message = {}) {
        try {
            const pid = uuidv4();
            this.#pool.push({
                pid: (message.pid = pid),
                channelString,
                message: Buffer.from(JSON.stringify(message)),
                cd: 0
            });
        } catch (error) {
            Utilities.showError(`Error @ ${this.constructor.name}.publish Message: ${error.message}`);
        }
    }
}
