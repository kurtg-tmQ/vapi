import ClientCapability from "twilio/lib/jwt/ClientCapability";
import { twiml, Twilio, jwt } from "twilio";
import Utilities from "../Utilities";
import Server from "../Server";

const { VoiceResponse } = twiml;

export class TwilioCall {
    /**
     * @type {pkg.Twilio}
     */
    #instance;
    #identity;
    #key;
    #secret;
    #friendlyName = "vapi-demo2";
    #voiceUrl = "";
    #callbackUrl = "";
    constructor(key, secret, number) {
        if (key && secret) {
            this.#instance = new Twilio(key, secret, { logLevel: 'debug' });
            this.#key = key;
            this.#secret = secret;
            this.#voiceUrl = Server.Config.host + "/handler/inbound/call";
            this.#callbackUrl = Server.Config.host + "/handler/callback/call";
        }
        this.#identity = number;
    }
    get Identity() {
        return this.#identity;
    }
    /**
     * @returns {Twilio}
     */
    get Instance() {
        return this.#instance;
    }
    say(message) {
        const twiml = new VoiceResponse();
        twiml.say(message);
        return twiml.toString();
    }
    isAValidPhoneNumber(number) {
        return /^[\d\+\-\(\) ]+$/.test(number);
    }
    updateCall(sid, xml) {
        return new Promise((resolve) => {
            if (this.Instance)
                this.Instance.calls(sid).update({ twiml: xml }).then(resolve);
            else
                resolve();
        });
    }
    getCallStatus(sid) {
        if (this.Instance)
            return this.Instance.calls(sid).fetch().then((call) => call.status);
        return Promise.resolve(null);
    }
    hangup(sid) {
        const proc = [];
        this.getCallStatus(sid).then((status) => {
            if (status != "completed") {
                const voiceResponse = new VoiceResponse();
                voiceResponse.hangup();
                proc.push(this.updateCall(sid, voiceResponse.toString()));
            }
        });
        return Promise.all(proc);
    }
    wait() {
        const twiml = new VoiceResponse();
        twiml.play({ loop: 2 }, "http://com.twilio.music.ambient.s3.amazonaws.com/gurdonark_-_Plains.mp3");
        twiml.play({ loop: 2 }, "http://com.twilio.music.ambient.s3.amazonaws.com/gurdonark_-_Exurb.mp3");
        twiml.play({ loop: 2 }, "http://com.twilio.music.ambient.s3.amazonaws.com/aerosolspray_-_Living_Taciturn.mp3");
        return twiml.toString();
    }
    forwardCall(to, sid) {
        const twiml = new VoiceResponse();
        twiml.dial(to);
        return this.updateCall(sid, twiml.toString()).then(() => to);
    }
    fetchAppSid() {
        if (this.Instance)
            return this.Instance.applications.list({ friendlyName: this.#friendlyName, limit: 1 })
                .then((applications) => applications);
        return Promise.resolve(null);
    }
    createAppSid() {
        if (this.Instance) {
            return this.Instance.applications
                .create({
                    voiceMethod: "POST",
                    voiceUrl: this.#voiceUrl,
                    statusCallbackMethod: "POST",
                    statusCallbackUrl: this.#callbackUrl,
                    friendlyName: this.#friendlyName
                })
                .then((application) => application.sid);
        }
        return Promise.resolve(null);
    }
    async getToken(identity = null) {
        try {
            if (!this.#instance) {
                Utilities.showError('Twilio instance not initialized');
                return null;
            }

            // Use the provided identity or fall back to the class identity
            const tokenIdentity = identity || this.#identity;

            if (!tokenIdentity) {
                Utilities.showError('Identity not provided');
                return null;
            }
            let appSid = await this.fetchAppSid();
            if (appSid) appSid = await this.createAppSid();
            if (appSid) {
                const capability = new ClientCapability({
                    accountSid: this.#key,
                    authToken: this.#secret,
                    ttl: 60 * 30
                });
                capability.addScope(
                    new jwt.ClientCapability.IncomingClientScope(tokenIdentity)
                );
                capability.addScope(
                    new jwt.ClientCapability.OutgoingClientScope({
                        applicationSid: appSid
                    })
                );
                const token = capability.toJwt();
                Utilities.showStatus("Generated token from `%s`", appSid);
                return token;
            }
        } catch (error) {
            Utilities.showError('Failed to generate Twilio token:', error);
            return null;
        }
    }
    parseRequest(From) {
        const twiml = new VoiceResponse();
        twiml.start().stream({
            url: Server.Config.transcripUrl,
            track: "both_tracks",
        }).parameter({
            name: "webhook",
            value: `${Server.Config.host}/handler/inbound/coach`
        });
        twiml.dial({
            callerId: From
        }).client(this.#identity);
        return twiml.toString();
    }
}