import Utilities from "../utilities";

export class Sms {
    #provider = null;
    #key = null;
    #secret = null;
    #number = null;
    #instance = null;
    constructor(provider, key, secret, number) {
        this.#provider = provider;
        this.#key = key;
        this.#secret = secret;
        this.#number = number;
    }
    get Key() {
        return this.#key;
    }
    get Secret() {
        return this.#secret;
    }
    get Provider() {
        return this.#provider;
    }
    get Number() {
        return this.#number;
    }
    get Instance() {
        return this.#instance;
    }
    setInstance(instance) {
        this.#instance = instance;
    }
    isNumberValid(number, getNationality = false) {
        if (Utilities.isValidString(number)) {
            const check = Utilities.numberValidator(number);
            if (check.isValid)
                if (getNationality)
                    return { number: check.e164Format, fromUS: check.fromUS, iso: check.region, isToll: check.type == "toll-free" };
                else
                    return check.e164Format;
        }
        throw new Error(`Invalid number found @ ${this.constructor.name}! ref: ${number}`);
    }
    /**
     * 
     * @param {String} to 
     * @param {String} message 
     * @returns {Promise}
     */
    sendSMS(to, message) { return "NOT YET IMPLEMENTED"; }
    checkHooks(data, hooks) {
        if (typeof data === "object") {
            for (let i = 0; i < hooks.length; i++) {
                if (data[hooks[i]] == null)
                    return false;
            }
            return true;
        }
        return false;
    }
}