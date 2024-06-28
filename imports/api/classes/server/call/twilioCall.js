import { twiml, Twilio } from "twilio";

const { VoiceResponse } = twiml;


export class TwilioCall {
    /**
     * @type {pkg.Twilio}
     */
    #instance;
    #identity;
    constructor(key, secret, number) {
        if (key && secret)
            this.#instance = new Twilio(key, secret);
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
}