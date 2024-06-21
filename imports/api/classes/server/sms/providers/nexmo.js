import nexmo from "nexmo";

import Utilities from "../../utilities";
import { Sms } from "../smsMiddleware";

export class Nexmo extends Sms {
    #instance = null;
    constructor(name, key, secret, number) {
        super(name, key, secret, number);
        this.#instance = new nexmo({ apiKey: key, apiSecret: secret });
    }
    /**
     * @returns {nexmo}
     */
    get Instance() {
        return this.#instance;
    }

    sendSMS(to, message) {
        return new Promise((resolve, reject) => {
            if (!this.Instance)
                reject("No Instance Created");

            let options = { "status-report-req": 1, "type": "text" };
            if (Utilities.isUnicode(message))
                options.type = "unicode";
            this.Instance.message.sendSms(this.Number, to, message, options, (err, response) => {
                if (err) {
                    Utilities.showError(`Error sending SMS with '${this.Number}'(${this.Provider}):`, err);
                    resolve({
                        code: 500,
                        messageId: null,
                        status: "FAILED",
                        error: `Failed sending request! response: ${err.message || err} ${this.Number}(${this.Provider})`
                    });
                } else if (!response) {
                    Utilities.showError("Failed sending SMS/MMS with `%s` (%s) err: %s", this.Number, this.Provider, "No Response");
                    resolve({
                        code: 500,
                        messageId: null,
                        status: "ERROR",
                        error: `Failed sending request! response: No response ${this.Number}(${this.Provider})`
                    });
                } else if (response.statusCode > 299) {
                    Utilities.showError("Failed sending SMS/MMS `%s` (%s) err: %s", this.Number, this.Provider, response.content);
                    resolve({
                        code: 501,
                        messageId: null,
                        status: "ERROR",
                        error: `Failed sending request! response: [${response.statusCode}]` +
                            ` ${JSON.stringify(response.content)} ${this.Number}(${this.Provider})`
                    });
                } else {
                    if (response.messages && response.messages.length) {
                        resolve(
                            response.messages.map((item) => {
                                return {
                                    messageId: item["message-id"],
                                    status: (item["error-text"] ? "failed" : "buffered").toUpperCase(),
                                    code: parseInt(item.status) || -1,
                                    segment: parseInt(item["message-count"]),
                                    pricing: {
                                        network: item.network,
                                        price: parseFloat(item["message-price"])
                                    }
                                };
                            }));
                    } else {
                        Utilities.showError("Failed sending SMS/MMS with `%s` (%s) err: %s", this.Number, this.Provider, "No Response");
                        resolve({
                            code: 500,
                            messageId: null,
                            status: "ERROR",
                            error: `Failed sending request! response: No response ${this.Number}(${this.Provider})`
                        });
                    }
                }
            });
        });
    }
}