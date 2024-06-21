import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import moment from "moment";

const createCollection = (name, option = { idGeneration: "MONGO" }) => {
    return new Mongo.Collection(name, option);
};

export const rawMongoID = MongoInternals.NpmModule.ObjectID;
export const MongoID = Mongo.ObjectID;
export const NETWORK = {
    TWILIO: "twilio",
    NEXMO: "nexmo",
    INTELLIQUENT: "intelliquent",
};

export const INDEXES = {
    Consumers: [{ key: { createdAt: -1 } }, { key: { firstname: 1 } }, { key: { lastname: 1 } }],
    Sessions: [{ key: { timestanmp: -1 } }],
};

const DB = {
    Business: (() => createCollection("business"))(),
    Consumers: (() => createCollection("consumers"))(),
    Sessions: (() => createCollection("sessions"))(),
    Channels: (() => createCollection("channels"))(),
    Users: Meteor.users,
};

export default DB;

export class Channels {
    constructor({ _id, businessId, number, createdAt, updatedAt, api = { key: "", secret: "", network: "" } }) {
        this._id = _id;
        this.businessId = businessId;
        this.number = number;
        this.api = api;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get Default() {
        return {
            businessId: "",
            number: "",
            api: {
                key: "", secret: "", network: "",
            },
        };
    }
    save() {
        if (this._id) {
            this.updatedAt = moment().valueOf();
            DB.Channels.update({ _id: this._id }, this);
        } else {
            this.createdAt = moment().valueOf();
            delete this._id;
            this._id = DB.Channels.insert(this);
        }
    }
}

export class Business {
    constructor({ _id, name, address, createdAt, updatedAt }) {
        this._id = _id;
        this.name = name;
        this.address = address;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get Default() {
        return {
            name: "",
            address: "",
        };
    }
    save() {
        if (this._id) {
            this.updatedAt = moment().valueOf();
            DB.Business.update({ _id: this._id }, this);
        } else {
            this.createdAt = moment().valueOf();
            delete this._id;
            this._id = DB.Business.insert(this);
        }
    }
}

export class Consumer {
    constructor({ _id, businessId, firstName, lastName, zipCode, birthday, account = { cardNumber: "", sss: "", }, contactInfo = { email: "", phone: "", mobile: "" },
        security = { question: "", answer: "", password: "", passwordRequired: false }, createdAt, updatedAt }) {
        this._id = _id;
        this.businessId = businessId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipCode = zipCode;
        this.birthday = birthday;
        this.account = account;
        this.contactInfo = contactInfo;
        this.security = security;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    get Default() {
        return {
            firstName: "",
            lastName: "",
            zipCode: "",
            birthday: "",
            businessId: "",
            account: { cardNumber: "", sss: "", },
            contactInfo: { email: "", phone: "", mobile: "" },
            security: { question: "", answer: "", password: "", passwordRequired: false },
        };
    }

    get CardNumber() {
        return this.account.cardNumber;
    }

    get SSS() {
        return this.account.sss;
    }

    verifyBirthday(birthday) {
        return moment(birthday, "YYYY-MM-DD").isSame(moment(this.birthday, "YYYY-MM-DD"));
    }
    verifyZipCode(zipCode) {
        return parseInt(zipCode) === parseInt(this.zipCode);
    }
    requirePassword() {
        return this.security.passwordRequired;
    }
    verifyCardNumber(cardNumber) {
        return cardNumber === this.CardNumber;
    }
    verifySss(sss) {
        return sss === this.SSS;
    }
    verifyPassword(password) {
        return password === this.security.password;
    }
    save() {
        if (this._id) {
            this.updatedAt = moment().valueOf();
            DB.Consumers.update({ _id: this._id }, this);
        } else {
            this.createdAt = moment().valueOf();
            delete this._id;
            this._id = DB.Consumers.insert(this);
        }
    }
}