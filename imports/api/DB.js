import { Meteor } from "meteor/meteor";
import { Mongo, MongoInternals } from "meteor/mongo";
import moment from "moment";

import { Intelliquent } from "./classes/server/sms/providers/intelliquent";
import { TwilioSMS } from "./classes/server/sms/providers/twilio";
import { Nexmo } from "./classes/server/sms/providers/nexmo";
import { TwilioCall } from "./classes/server/call/twilioCall";
import Utilities from "./classes/server/Utilities";

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
const createBucket = (bucketName) => {
    const options = bucketName ? { bucketName } : undefined;
    return new MongoInternals.NpmModule.GridFSBucket(
        MongoInternals.defaultRemoteCollectionDriver().mongo.db,
        options
    );
};

const DB = {
    Business: (() => createCollection("business"))(),
    Consumers: (() => createCollection("consumers"))(),
    Sessions: (() => createCollection("sessions"))(),
    Channels: (() => createCollection("channels"))(),
    Temps: (() => createCollection("temps"))(),
    Pools: (() => createCollection("pools"))(),
    KnowledgeFiles: (() => createBucket("knowledgefiles"))(),
    Users: Meteor.users,
};

export default DB;


export class KnowledgeBase {
    saveKnowledgeBaseFile(string, url, title) {
        const buffer = Buffer.from(string, 'utf-8');
        const metadata = {
            fileType: 'text',
            url: url,
            title: title,
            createdAt: moment().valueOf(),
            updatedAt: moment().valueOf(),
        };
        const uploadStream = DB.KnowledgeFiles.openUploadStream(url, { metadata })
        uploadStream.end(buffer);
        return uploadStream.id;
    }
    findFile(baseUrl) {
        return new Promise((resolve, reject) => {
            DB.KnowledgeFiles.find({ "metadata.url": baseUrl }).toArray((err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                };
            });
        })
    }
    getFile(fileId) {
        return new Promise((resolve, reject) => {
            const downloadStream = DB.KnowledgeFiles.openDownloadStream(fileId);

            let fileData = '';
            downloadStream.on('data', (chunk) => {
                fileData += chunk.toString('utf8');
            });

            downloadStream.on('error', (error) => {
                reject(error);
            });

            downloadStream.on('end', () => {
                resolve(fileData);
            });
        });
    }


}
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


export class Pools {
    constructor({ _id, id, orgId, assistantId, number, createdAt, updatedAt, twilioAccountSid, twilioAuthToken, name, provider, isAvailable }) {
        this._id = _id;
        this.phoneId = id;
        this.orgId = orgId;
        this.assistantId = assistantId;
        this.number = number;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.twilioAccountSid = twilioAccountSid;
        this.twilioAuthToken = twilioAuthToken;
        this.name = name;
        this.provider = provider;
        // this.isAvailable = isAvailable;
    }
    get Default() {
        return {
            _id: "",
            phoneId: "",
            orgId: "",
            assistantId: "",
            number: "",
            createdAt: "",
            updatedAt: "",
            twilioAccountSid: "",
            twilioAuthToken: "",
            name: "",
            provider: "",
            // isAvailable: "",
        };
    }

    get PhoneNumber() {
        return this;
    }

    save() {
        if (this._id) {
            this.updatedAt = moment().valueOf();
            DB.Pools.update({ _id: this._id }, this);
        } else {
            this.createdAt = moment().valueOf();
            this.updatedAt = moment().valueOf();
            delete this._id;
            this._id = DB.Pools.insert(this);
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
        this.businessId = businessId || Consumer.Default.businessId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipCode = zipCode || Consumer.Default.zipCode;
        this.birthday = birthday || Consumer.Default.birthday;
        this.account = account || Consumer.Default.account;
        this.contactInfo = contactInfo;
        this.security = security;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.session = session;
        this.address = address || Consumer.Default.address;
    }
    static get Default() {
        return {
            firstName: "",
            lastName: "",
            zipCode: "30328",
            birthday: "2000-01-01",
            businessId: new Mongo.ObjectID("7c3ab4effedcbf75dc0cee13"),
            inboundBusinessId: new Mongo.ObjectID("dda651f795392e2436b0421b"),
            account: { cardNumber: "1234", sss: "4567", status: "" },
            contactInfo: { email: "", phone: "", mobile: "" },
            security: { question: "", answer: "", password: "", passwordRequired: false },
            session: [
                { sessionId: "", createdAt: "", updatedAt: "", active: false, otp: { code: "", expiresIn: "" } },
            ],
            address: "1234 Main St, Minneapolis, MN 55416",
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
    toObject() {
        return {
            _id: this._id,
            businessId: this.businessId,
            firstName: this.firstName,
            lastName: this.lastName,
            zipCode: this.zipCode,
            birthday: this.birthday,
            account: this.account,
            contactInfo: this.contactInfo,
            security: this.security,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            session: this.session,
            address: this.address,
        };
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
    verifyFirstLastName(firstName, lastName) {
        const frist = new RegExp(firstName, "i");
        const last = new RegExp(lastName, "i");
        return frist.test(this.firstName) && last.test(this.lastName);
    }
    sendOTP(number, sessionId) {
        if (this.contactInfo.mobile || number) {
            const channel = DB.Channels.findOne({ businessId: Consumer.Default.businessId });
            if (!channel) return Promise.reject("no channel");
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
                return { valid: true, reason: "valid" };
            }
        }
        return { valid: false, reason: "invalid code" };
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
            DB.Consumers.update({ _id: this._id }, this, { upsert: true });
        } else {
            this.createdAt = moment().valueOf();
            delete this._id;
            this._id = DB.Consumers.insert(this);
        }
    }
    saveTemp() {
        const exist = DB.Temps.findOne({ "contactInfo.mobile": this.contactInfo.mobile });
        if (exist) {
            this._id = exist._id;
            this.updatedAt = moment().valueOf();
            DB.Temps.update({ _id: this._id }, this);
        } else {
            this.createdAt = moment().valueOf();
            delete this._id;
            this._id = DB.Temps.insert(this);
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
        return moment().isAfter(this.#expiresIn);
    }
    getIsValid(otp) {
        if (this.#used) return true;
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

