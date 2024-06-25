import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import moment from "moment";

import { Intelliquent } from "./classes/server/sms/providers/intelliquent";
import { TwilioSMS } from "./classes/server/sms/providers/twilio";
import { Nexmo } from "./classes/server/sms/providers/nexmo";

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
    get Api() {
        return this.api;
    }
    get Provider() {
        switch (this.api.network) {
            case NETWORK.INTELLIQUENT:
                return new Intelliquent(this.api.network, this.api.key, this.api.secret, this.number);
            case NETWORK.NEXMO:
                return new Nexmo(this.api.network, this.api.key, this.api.secret, this.number);
            case NETWORK.TWILIO:
                return new TwilioSMS(this.api.network, this.api.key, this.api.secret, this.number);
            default:
                return {};
        }
    }

    sendSMS(to, message) {
        return this.Provider.sendSMS(to, message);
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
    constructor({
        _id, businessId, firstName, lastName, zipCode, birthday, address,
        account = { cardNumber: "", sss: "", status: "" },
        contactInfo = { email: "", phone: "", mobile: "" },
        security = { question: "", answer: "", password: "", passwordRequired: false },
        createdAt, updatedAt, session = []
    }) {
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
        this.session = session;
        this.address = address;
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
            session: [
                { sessionId: "", createdAt: "", updatedAt: "", active: false, otp: { code: "", expiresIn: "" } },
            ]
        };
    }
    get CardNumber() {
        return this.account.cardNumber;
    }
    get SSS() {
        return this.account.sss;
    }
    get OTP() {
        return this.session.otp;
    }
    verifyBirthday(birthday) {
        return birthday === this.birthday;
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
    checkCellPhoneNUmber(cellphone) {
        return cellphone === this.contactInfo.mobile;
    }
    sendOTP(number, sessionId) {
        if (this.contactInfo.mobile || number) {
            const channel = DB.Channels.findOne({ businessId: this.businessId });
            const ch = new Channels(channel);
            let phonenumber = this.contactInfo.mobile;
            // if (!phonenumber && number) phonenumber = number;
            if (number) phonenumber = number;
            const otp = new OTP({});
            const code = otp.generateOTP(4);

            //TESTING
            // this.save();
            // return Promise.resolve("OTP sent");
            return ch.sendSMS(phonenumber, `Your OTP is ${code}`).then((response) => {
                const errorStatus = ["ERROR", "FAILED"];
                if (errorStatus.includes(response.status)) {
                    return Promise.reject("OTP not sent");
                }
                this.session.push({ sessionId, otp: { code, expiresIn: otp.ExpiresIn } });
                this.save();
                return Promise.resolve("OTP sent");
            });
        } else {
            return Promise.resolve("no number");
        }
    }
    processCardReplacement() {
        this.account = { ...this.account, status: "A-01" };
        this.save();
        return Promise.resolve({ verified: true, result: { start: "2024-07-01", end: "2024-07-15" } });
    }
    processChangeAddress(address) {
        this.address = address;
        this.save();
        return Promise.resolve({ verified: true, result: { cost: "3.15 USD" } });
    }
    async verifyOTP(code, sessionId) {
        const otps = this.session.filter((s) => s.sessionId === sessionId);
        const last = otps[otps.length - 1];
        if (last) {
            const otp = new OTP(last.otp);
            if (otp.getIsValid(code)) {
                last.otp.used = true;
                this.save();
                return {valid: true, reason:"valid"};
            }
        }
        return {valid:false, reason:"invalid code"};
    }
    getLast2digitsOfOTP(sessionId) {
        const otps = this.session.filter((s) => s.sessionId === sessionId);
        const last = otps[otps.length - 1];
        if (last) {
            const otp = new OTP(last.otp);
            if (!otp.IsExpired) return Promise.resolve(otp.OTP.slice(-2));
        }
        return Promise.resolve("expired");
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

class OTP {
    #code;
    #expiresIn;
    #used;
    constructor({ code = "", expiresIn = 0, used = false }) {
        this.#code = code;
        this.#expiresIn = expiresIn;
        this.#used = used;
    }
    get ExpiresIn() {
        return this.#expiresIn;
    }
    get OTP() {
        return this.#code;
    }
    get IsExpired() {
        if (this.#used) return true;
        return moment().isAfter(this.#expiresIn);
    }
    getIsValid(otp) {
        if (this.IsExpired) return false;
        return parseInt(otp) === parseInt(this.#code);
    }
    /**
     * @description generate digit OTP based on length
     * @param {*} length 
     * @returns {Number}
     */
    generateOTP(length = 4) {
        this.#expiresIn = moment().add(5, "minutes").valueOf();
        let otp = Math.floor(Math.random() * Math.pow(10, length)).toString();
        while (otp.length < length) {
            otp = '0' + otp;
        }
        this.#code = otp;
        this.#used = false;
        return otp;
    }

}