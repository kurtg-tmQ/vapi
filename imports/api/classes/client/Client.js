import { EventEmitter } from "events";
import moment from "moment";

import { SESSION_KEY } from "../common/Const";
import RedisVent from "./RedisVent";
import Watcher from "./Watcher";


class Client extends Watcher {
    #checklist = [];
    #check = null;
    #events = new EventEmitter();
    #transcript = [];
    constructor(parent) {
        super(parent);
        this.secureTransaction();
    }
    /**
     * @returns {EventEmitter}
     */
    get Events() {
        return this.#events;
    }
    get Checklist() {
        return this.#checklist;
    }
    getChecklistIdx(list = [], id) {
        const parentIdx = list.findIndex((category) => {
            return !!category.items.find((item) => item.value === id);
        });
        const childIdx = list[parentIdx].items.findIndex((item) => item.value === id);
        return { parentIdx, childIdx };
    };
    parseIncomingData(data = []) {
        return data.map((d) => {
            return {
                status: d.role === "bot" ? 2 : 1,
                message: d.message,
                time: moment(d.time).format("hh:mm:ss A")
            };

        });
    };
    parseIncomingTranscript(transcript) {
        this.#transcript.push({
            status: transcript.role === "assistant" ? 2 : 1,
            message: transcript.message,
            time: moment(transcript.time).format("hh:mm:ss A")
        });
    }
    on(eventName, callback) {
        if (this.#events.listenerCount(eventName) < 1)
            this.#events.on(eventName, callback);
    }
    listen() {
        if (!this.#check) {
            RedisVent.Session.listen(SESSION_KEY.UPDATE_CHECKLIST, "session", ({ event, data }) => {
                data = data.data;
                switch (event) {
                    case "upsert": {
                        if (this.#checklist.length) {
                            const { parentIdx, childIdx } = this.getChecklistIdx(this.#checklist, data.id);
                            if (parentIdx > -1 && childIdx > -1) {
                                const newChecklist = [...this.#checklist].map((category) => ({ ...category, items: [...category.items].map((item) => ({ ...item, current: false })) }));
                                newChecklist[parentIdx].items[childIdx] = { ...newChecklist[parentIdx].items[childIdx], current: true, completed: data.valid };
                                newChecklist[parentIdx].isComplete = !!newChecklist[parentIdx].items.every((item) => item.completed);
                                this.#checklist = newChecklist;
                                this.#events.emit(SESSION_KEY.UPDATE_CHECKLIST, this.#checklist);
                            }
                        }
                        break;
                    }
                    default:
                        break;
                }
            });
            RedisVent.Session.listen(SESSION_KEY.UPDATE_CONVERSAION, "session", ({ event, data }) => {
                switch (event) {
                    case "upsert":
                        const chatData = this.parseIncomingData(data.data);
                        this.#events.emit(SESSION_KEY.UPDATE_CONVERSAION, chatData);
                        break;
                    default:
                        break;
                }
            });
            RedisVent.Session.listen(SESSION_KEY.UPDATE_STATUS, "session", ({ event, data }) => {
                data = data.data;
                switch (event) {
                    case "upsert":
                        switch (data.status) {
                            case "started":
                                this.#events.emit(SESSION_KEY.START, data.checklist);
                                this.#checklist = data.checklist;
                                this.#events.emit(SESSION_KEY.UPDATE_CHECKLIST, this.#checklist);
                                break;
                            case "ended":
                            case "completed":
                                this.#events.emit(SESSION_KEY.END);
                                this.reset();
                                break;
                        }
                        break;
                    default:
                        break;
                }
            });
            this.#check = true;
        }
    }
    reset() {
        this.#checklist = [];
    }
}

export default new Client();