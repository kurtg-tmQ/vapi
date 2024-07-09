import { RedisClient } from "../services/RedisClient.js";
import { PubSub } from "../services/PubSub.js";
import Logger from "../helpers/Logger.js";
import dotenv from 'dotenv';
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

class RedisManager {
    constructor() {
        this.redisClient = new RedisClient({
            host: REDIS_HOST,
            port: REDIS_PORT
        });
        this.redisClient.onReady(() => {
            this.redisPubSub = new PubSub(this.redisClient.Instance);
            this.redisPubSub.poolResponse();
            this.redisPubSub.startSub().then(() => {
                Logger.showStatus("Redis pubsub ready");
            });
        });
    }
    /**
     * 
     * @param {String} channel 
     * @param {Object} message 
     */
    publish(channel, message) {
        this.redisPubSub.publish(channel, message);
    }
}

export default new RedisManager();