import { Vent } from "meteor/cultofcoders:redis-oplog";
import Utilities from "./Utilities";

const EVENTS = [
    // default events
    "update", "insert", "remove", "upsert",
    //custom event
];
class RedisVent {
    #pre;
    constructor() { }
    get Session() {
        this.#pre = "session";
        return this;
    }

    publish() {
        const pub = function (namespace, key, id) {
            if (typeof this.userId != "string")
                return this.ready();

            EVENTS.forEach((event) => {
                if (typeof id == "string")
                    this.on(`${namespace}::${key}::${id}::${event}`, (data) => {
                        return { data, event };
                    });
                else if (id instanceof Array)
                    id.forEach((id_) => {
                        this.on(`${namespace}::${key}::${id_}::${event}`, (data) => {
                            return { data, event };
                        });
                    });
            });
            // ADD CUSTOM EVENTS HERE
            return this.ready();
        };
        Utilities.showNotice("Publishing to Redis Vent publications...");
        Vent.publish({
            "listen"({ namespace, key, id }) {
                pub.call(this, namespace, key, id);
            }
        });
        Utilities.showStatus("Done publishing events to Redis Vent publication...");
    }
    triggerUpdate(key, id, data) {
        if (this.#pre) {
            Vent.emit(`${this.#pre}::${key}::${id}::update`, { _id: id, data });
            this.#pre = null;
        }
    }
    triggerUpsert(key, id, data) {
        if (this.#pre) {
            Vent.emit(`${this.#pre}::${key}::${id}::upsert`, { _id: id, data });
            this.#pre = null;
        }
    }
    triggerInsert(key, id, data) {
        if (this.#pre) {
            Vent.emit(`${this.#pre}::${key}::${id}::insert`, { data });
            this.#pre = null;
        }
    }
    triggerRemove(key, id, data) {
        if (this.#pre) {
            Vent.emit(`${this.#pre}::${key}::${id}::remove`, { _id: data });
            this.#pre = null;
        }
    }
    triggerCustom(key, event, id, data) {
        if (this.#pre) {
            Vent.emit(`${this.#pre}::${key}::${id}::${event}`, { data });
            this.#pre = null;
        }
    }
}

export default new RedisVent();