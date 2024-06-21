import { fetch, Headers } from "meteor/fetch";

import { Sms } from "../smsMiddleware";
import Utilities from "../../utilities";

export class Intelliquent extends Sms {
    constructor(provider, key, secret, number) {
        super(provider, key, secret, number);
    }

    sendSMS(to, message) {
        return new Promise((resolve) => {
            let param = {
                "to": [
                    to.replace("+", "")
                ],
                "from": this.Number.replace("+", ""),
                "text": message
            };
            fetch("https://messagebroker.inteliquent.com/msgbroker/rest/publishMessages", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.Key}`
                }),
                redirect: "follow",
                body: JSON.stringify(param)
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((body) => {
                        if (!body.result) {
                            Utilities.showError("Failed sending SMS/MMS `%s` (%s) err: %s", this.Number, this.Provider, "No results found!");
                            resolve({
                                code: 501,
                                messageId: null,
                                status: "ERROR",
                                error: `Failed sending request! response: No response ${this.Number}(${this.Provider})`
                            });
                        } else
                            resolve({
                                messageId: body.result.referenceId,
                                status: body.result.resultResponses[0].status,
                                code: -1
                            });
                    });
                } else {
                    const err = response.statusText + ` ${this.Number}(${this.Provider})` + ` Error Code: ${response.status}`;
                    Utilities.showError("Failed sending SMS/MMS `%s` (%s) err: %s", this.Number, this.Provider, response.content, err);
                    resolve({
                        code: response.status,
                        messageId: null,
                        status: "ERROR",
                        error: `Failed sending request! response: ${response.content} ${response.status} ${this.Number}(${this.Provider})`
                    });
                }
            }).catch((err) => {
                Utilities.showError("Error sending SMS/MMS with `%s` (%s) err: %s", this.Number, this.Provider, err.message || err);
                resolve({
                    code: err.code,
                    messageId: null,
                    status: "FAILED",
                    error: `Failed sending request! response: ${err.message || err} ${this.Number}(${this.Provider})`
                });
            });
        });
    }
}   