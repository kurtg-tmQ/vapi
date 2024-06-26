import { MongoInternals, Mongo } from "meteor/mongo";

import Utilities from "./classes/server/Utilities";

export class RemoteDatabase {
    #name = null;
    #url = null;
    #instance = null;
    #collections = {};
    constructor(name, url) {
        this.#name = name;
        this.#url = url;
        this.#instance = new MongoInternals.RemoteCollectionDriver(this.URL);
        Utilities.showStatus("Initialized Remote Database: [%s]", this.Name);
    }
    /**
     * @returns {String}
     */
    get Name() {
        return this.#name;
    }
    /**
     * @returns {String}
     */
    get URL() {
        return this.#url;
    }
    /**
     * @returns {MongoInternals.RemoteCollectionDriver}
     */
    get Instance() {
        return this.#instance;
    }
    async check() {
        try {
            Utilities.showDebug("DB: [%s] collection: [%s], query: [%s]", this.Name, this.Collection, this.CountQuery);
            if (!this.Instance.mongo.client.isConnected()) {
                return { status: "disconnected", count: 0 };
            }
            const count = this.Instance.mongo.find(this.Collection, this.CountQuery).count();
            return { status: "ok", count };
        } catch (error) {
            return { status: Utilities.errorMessageHandler(error), count: 0 };
        }
    }
    /**
     * 
     * @param {String} collection 
     * @returns {Mongo.Collection}
     */
    getCollection(collection) {
        if (!this.#collections[collection]) {
            this.#collections[collection] = new Mongo.Collection(collection, { _driver: this.Instance });
        }
        return this.#collections[collection];
    }

    renamer(urlString) {
        const cases = urlString.includes("@");
        if (cases) {
            let char = urlString.split("@");
            let ip = char[1].split(":")[0];
            return `${ip}`;
        } else {
            let local = urlString.split(":");
            let localIp = local[1].replace(/\//g, "");
            return `${localIp}`;
        }
    }
}