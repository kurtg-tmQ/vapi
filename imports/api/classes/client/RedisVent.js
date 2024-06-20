import { Vent } from "meteor/cultofcoders:redis-oplog";
import { Random } from "meteor/random";
import _ from "lodash";
import { Meteor } from "meteor/meteor";

import Client from "./Client";

class RedisVent {
    #pre = "";
    #collections = {};
    constructor() { }
    get Session() {
        this.#pre = "session";
        return this;
    }
    /**
     * Prepare a mini mongo before subscribing to Vents subscription
     * @param {String} key 
     */
    prepareCollection(key) {
        if (this.#pre) {
            const id = `${this.#pre}::${key}`;
            if (!this.#collections[id])
                this.#collections[id] = new Mongo.Collection(null);
            this.#pre = null;
        }
    }
    /**
     * Listen for redis event publication
     * @param {String} key name of the collection where to save changes
     * @param {String|Array<String>} id unique identifier
     * @param {function} callback function to handle custom events
     * @returns {Object}
     */
    listen(key, id, callback) {
        if (this.#pre) {
            const subscription = new VentClientSubscription(this, "listen");
            Vent.add(subscription);
            const handler = subscription.subscribe({ namespace: this.#pre, key, id });
            const idKey = `${this.#pre}::${key}`;

            if (!this.#collections[idKey])
                this.#collections[idKey] = new Mongo.Collection(null);
            handler.listen(({ event, data }) => {
                let upsert = false;
                switch (event) {
                    case "upsert": upsert = true;
                    // eslint-disable-next-line no-fallthrough
                    case "update": {
                        const id_ = data.data._id || data._id;
                        delete data.data._id;
                        this.#collections[idKey].update({ _id: id_ }, { $set: data.data }, { upsert: upsert });
                        data.data._id = id_;
                        break;
                    }
                    case "insert": this.#collections[idKey].insert(data.data); break;
                    case "remove":
                        this.#collections[idKey].remove({
                            id: data._id || (data.data && data.data._id)
                        });
                        break;
                }
                if (typeof callback == "function")
                    callback({ event, data });
            });
            this.#pre = null;
            return subscription;
        }
        return null;
    }
    /**
     * Get created collection from subscribed event
     * @param {String} key 
     * @returns {Mongo.Collection}
     */
    getCollection(key) {
        if (this.#pre) {
            const id = `${this.#pre}::${key}`;
            if (this.#collections[id]) {
                this.#pre = null;
                return this.#collections[id];
            }
        }
        return null;
    }
    remove(subscription) {
        Vent.remove(subscription);
    }
}

export default new RedisVent();

/**
 * Handles Vent subscription
 */
class VentClientSubscription {
    constructor(client, name) {
        this.client = client;
        this._name = name;
        this._id = Random.id();
    }

    get id() {
        return `${this._id}.${this._name}`;
    }
    /**
     * Subscribes to Meteor
     *
     * @param args
     * @returns {*}
     */
    subscribe(...args) {
        const self = this;
        const handler = Client.NativeSubscribe(this._name, this._id, ...args);
        const oldStop = handler.stop;

        Object.assign(handler, {
            listen(eventHandler) {
                if (!_.isFunction(eventHandler)) {
                    throw new Meteor.Error("invalid-argument", "You should pass a function to listen()");
                }
                self._eventHandler = eventHandler;
            },
            stop() {
                self.client && self.client.remove(self);
                return oldStop.call(handler);
            }
        });

        return handler;
    }

    /**
     * Watches the incomming events
     */
    handle(event) {
        if (this._eventHandler) {
            this._eventHandler(event);
        } else {

        }
    }
}