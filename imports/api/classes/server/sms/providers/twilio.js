import webhooks from "twilio/lib/webhooks/webhooks";
import { Meteor } from "meteor/meteor";
import twilio from "twilio";

import Utilities from "../../utilities";
import { Sms } from "../smsMiddleware";
import Server from "../../server.js";

/**
 * @typedef {import('../../ChannelMiddleWare.js').Response} Response
 * @typedef {import('../../ChannelMiddleWare.js').ResponseApi} ResponseApi
 */
export class TwilioSMS extends Sms {
    #instance = null;
    constructor(name, key, secret, number) {
        super(name, key, secret, number);
        if (key && secret)
            this.#instance = new twilio(key, secret);
    }
    /**
    * @returns {nexmo}
    */
    get Instance() {
        return this.#instance;
    }
    /**
     * Send SMS to a number
     * @param {String} to 
     * @param {String} message 
     * @returns {Promise<Response>}
     */
    sendSMS(to, message, attachment) {
        return this.sendMMS(to, message, attachment);
    }
    /**
     * Send MMS to a number
     * @param {String} to 
     * @param {String} message 
     * @param {Array<String>} attachment 
     * @returns {Promise<Response>}
     */
    sendMMS(to, message, attachment = []) {
        return new Promise((resolve, reject) => {
            if (!this.Instance)
                reject("No Instance Created");
            else {
                to = this.isNumberValid(to);
                let json = {
                    to: to,
                    from: this.Number,
                    body: message,
                    statusCallback: Server.Config.receiptCallback
                };
                if (attachment && attachment.length)
                    json.mediaUrl = attachment;
                this.Instance.messages.create(json, (err, response) => {
                    if (err) {
                        Utilities.showError("Error sending SMS/MMS with `%s` (%s) err: %s", this.Number, this.Provider, err);
                        resolve({
                            code: err.code,
                            messageId: null,
                            status: "FAILED",
                            error: `Failed sending request! response: ${JSON.stringify(err)} ${this.Number}(${this.Provider})`
                        });
                    } else if (!response) {
                        Utilities.showError("Failed sending SMS/MMS with `%s` (%s) err: %s", this.Number, this.Provider, "No Response");
                        resolve({
                            code: 500,
                            messageId: null,
                            status: "ERROR",
                            error: `Failed sending request! response: No response ${this.Identity}(${this.Type})`
                        });
                    } else if (response.statusCode > 299) {
                        Utilities.showError("Failed sending SMS/MMS `%s` (%s) err: %s", this.Identity, this.Type, response.content);
                        resolve({
                            code: 501,
                            messageId: null,
                            status: "ERROR",
                            error: `Failed sending request! response: [${response.statusCode}]` +
                                ` ${JSON.stringify(response.content)} ${this.Identity}(${this.Type})`
                        });
                    } else {
                        resolve({
                            messageId: response.sid,
                            status: response.status.toUpperCase(),
                            code: response.errorCode || 0
                        });
                    }
                });
            }
        });
    }
    /**
     * Send TTS to a number
     * @param {String} to 
     * @param {String} message 
     * @returns {Promise<Response>}
     */
    sendTTS(to, message) {
        return new Promise((resolve, reject) => {
            if (!this.Instance)
                reject("No Instance Created");
            else {
                const action = `tts?Message${encodeURI(message)}&Network=${PROVIDER.NETWORK_TW}`;
                to = this.isNumberValid(to);
                this.Instance.calls.create({
                    to: to,
                    from: this.Identity,
                    url: action,
                    method: "POST",
                    fallbackMethod: "POST",
                    statusCallbackMethod: "POST",
                    record: "true"
                }, (err, response) => {
                    if (err) {
                        Utilities.showError("Error sending TTS with '%s' (%s) err:", this.Identity, this.Type, err);
                        resolve({
                            code: 502,
                            messageId: null,
                            status: "ERROR"
                        });
                    } else
                        resolve({
                            callId: response.sid,
                            code: 0,
                            status: response.status
                        });
                });
            }
        });
    }
    /**
     * Send Fax to a number
     * @param {String} to 
     * @param {Array<String>} attachment 
     * @returns {Promise<Response>}
     */
    sendFax(to, attachment) {
        return new Promise((resolve, reject) => {
            if (!this.Instance)
                reject("No Instance Created");
            else {
                to = this.isNumberValid(to);
                this.Instance.fax.v1.faxes.create({
                    to: to,
                    from: this.Identity,
                    mediaUrl: attachment
                }, (err, response) => {
                    if (err) {
                        Utilities.showError("Error sending Fax with '%s' (%s) err:", this.Identity, this.Type, err);
                        resolve({
                            code: 503,
                            messageId: null,
                            status: "ERROR"
                        });
                    } else {
                        resolve({
                            callId: response.sid,
                            code: 0,
                            status: response.status
                        });
                    }
                });
            }
        });
    }
    /**
     * Process request and send back response
     * @param {Request} request 
     * @param {Object} requestBody 
     * @returns {Promise<ResponseApi>}
     */
    apiResponse(request, requestBody) {
        return this.validateTWRequest(request.url, request.headers, requestBody).then((result) => {
            if (result)
                return {
                    statusCode: 200, headers: { "Content-Type": "text/xml", "Access-Control-Allow-Origin": "*" },
                    body: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>"
                };
            else
                return { statusCode: 401, headers: { "Content-Type": "text/xml" }, body: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response/>" };
        });
    }
    /**
     * Process incoming data into formatted object
     * @param {Object} requestBody 
     * @returns {Promise<Object|null>}
     */
    parseIncoming(requestBody) {
        return new Promise((resolve) => {
            if (!requestBody || !this.checkHooks(requestBody, ["MessageSid", "AccountSid", "ApiVersion", "Body"]))
                resolve(null);
            else {
                let retval = { attachment: [] };
                retval.messageId = requestBody.MessageSid;
                retval.network = PROVIDER.NETWORK_TW;
                if (requestBody.NumMedia) {
                    for (let x = 0; x < parseInt(requestBody.NumMedia); x++) {
                        retval.attachment.push({
                            url: requestBody["MediaUrl" + x],
                            type: requestBody["MediaContentType" + x]
                        });
                    }
                }

                //sanitize inputs
                retval.message = requestBody.Body;
                retval.consumerNumber = this.isNumberValid(requestBody.From);
                retval.businessNumber = this.isNumberValid(requestBody.To);

                resolve(retval);
            }
        });
    }
    /**
     * Process receipt data into formatted Object
     * @param {Object} requestBody 
     * @returns {Promise<Object|null>}
     */
    parseReceipt(requestBody) {
        return new Promise((resolve) => {
            if (!requestBody || !this.checkHooks(requestBody, ["MessageSid", "MessageStatus", "ApiVersion"]))
                resolve(null);
            else
                resolve({
                    id: requestBody.MessageSid, key: requestBody.MessageStatus, code: 0,
                    number: requestBody.From, recipient: requestBody.To, instance: this
                });
        });
    }
    /**
     * Validate twilio request
     * @param {String} url 
     * @param {Object} headers 
     * @param {Record<string,any>} params 
     * @returns {Promise<boolean>}
     */
    validateTWRequest(url, headers, params) {
        return new Promise((resolve) => {
            if (Meteor.isDevelopment)
                resolve(true);
            else {
                const signature = headers["x-twilio-signature"];
                const uri = Server.Config.host + url.substring(1, url.length);
                if (this.Credentials.secret) {
                    const authToken = this.Credentials.secret;
                    const signature2 = webhooks.getExpectedTwilioSignature(authToken, uri, params);
                    resolve(signature == signature2);
                } else
                    resolve(false);
            }
        });
    }
}