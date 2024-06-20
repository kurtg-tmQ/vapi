import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const createCollection = (name, option = { idGeneration: "MONGO" }) => {
    return new Mongo.Collection(name, option);
};

export const rawMongoID = MongoInternals.NpmModule.ObjectID;
export const MongoID = Mongo.ObjectID;

export const INDEXES = {
    Consumers: [{ key: { createdAt: -1 } }, { key: { firstname: 1 } }, { key: { lastname: 1 } }],
    Sessions: [{ key: { timestanmp: -1 } }],
};

const DB = {
    Business: (() => createCollection("business"))(),
    Consumers: (() => createCollection("consumers"))(),
    Sessions: (() => createCollection("sessions"))(),
    Users: Meteor.users,
};

export default DB;


export const ROLES = {
    STANDARD: 0x1,
    ADMIN: 0x2,
};

class Notifications {
    constructor(id, createdAt, message, attachment, msgId = "", status = "queued") {
        this.userId = id;
        this.message = message;
        this.attachment = attachment;
        this.createdAt = createdAt;
        this.msgId = msgId;
        this.status = status;
    }
    save() {
        const update = DB.Notification.insert(this);
        if (update && update._str) return update._str;
        return update;
    }
}


class Consumer {
    constructor(firstName, lastName, zipCode, sss, password, account = { cardNumber: "", key: "" }, config = { verifyPassword: false }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipCode = zipCode;
        this.sss = sss;
        this.password = password;
        this.account = account;
    }
}