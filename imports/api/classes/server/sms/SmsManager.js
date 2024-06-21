import { Intelliquent } from "./providers/intelliquent";
import { TwilioSMS } from "./providers/twilio";
import { Nexmo } from "./providers/nexmo";
import Utilities from "../utilities";

export class SMSManager {
    #providers = {};
    constructor(providers) {
        this.#initProviders(providers);
    }

    #initProviders = (providers) => {
        Utilities.showNotice("Initializing sms providers..");
        for (const id in providers) {
            switch (id) {
                case "intelliquent":
                    this.#providers[id] = new Intelliquent(
                        id,
                        providers[id].key,
                        providers[id].secret,
                        providers[id].number
                    );
                    break;
                case "nexmo":
                    this.#providers[id] = new Nexmo(
                        id,
                        providers[id].key,
                        providers[id].secret,
                        providers[id].number
                    );
                case "twilio":
                    this.#providers[id] = new TwilioSMS(
                        id,
                        providers[id].key,
                        providers[id].secret,
                        providers[id].number
                    );
                    break;
            }
        }
    };
    /**
     * 
     * @param {String} id 
     * @returns {import("./smsMiddleware").Sms}
     */
    #getProvider = (id) => {
        return this.#providers[id];
    };

    sendSMS(to, message) {
        return new Promise((resolve, reject) => {
            let number = Utilities.numberValidator(to);
            let provider = this.#getProvider("nexmo");
            if (number.isValid) {
                if (number.fromUS) provider = this.#getProvider("intelliquent");
                if (!provider) provider = this.#getProvider("twilio");
                if (!provider) reject("No provider found");
                provider.sendSMS(to, message).then(resolve).catch(reject);
            } else
                reject("Invalid phone number");
        });
    }
}