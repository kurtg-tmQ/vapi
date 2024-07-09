import { EventEmitter } from "events";

export const CALL_EVENTS = {
    INCOMING: 'incoming',
    ACCEPT: 'accept',
    DISCONNECT: 'disconnect',
    ERROR: 'error'
};

export class TwilioStreamCall {
    #streamUrl = 'wss://proven-cub-balanced.ngrok-free.app';
    #connection = null;
    constructor() {
        this.device = null;
        this.call = null;
        this.events = new EventEmitter();
    }
    /**
     * @returns {EventEmitter}
     */
    get Event() {
        return this.events;
    }
    get IsMuted() {
        if (this.#connection) return this.#connection.isMuted();
        return false;
    }

    async initialize(token) {
        try {
            this.device = new Twilio.Device();
            this.device.setup(token, { debug: true });
            console.log('Twilio device registered successfully');
            this.setupIncomingCallHandler();
            this.addDeviceListeners(this.device);
        } catch (error) {
            console.error('Failed to initialize Twilio device:', error);
        }
    }
    isAValidPhoneNumber(number) {
        return /^[\d\+\-\(\) ]+$/.test(number);
    }
    setupIncomingCallHandler() {
        this.device.on('incoming', (call) => {
            this.events.emit(CALL_EVENTS.INCOMING, call);
            this.call = call;
            console.log('Incoming call:', call);
            this.setupCallListeners();
            // You can automatically accept the call or implement UI for user to accept/reject
            // this.acceptIncomingCall();
        });
    }
    updateAllAudioDevices(device) {
        if (device) {
            // updateDevices(speakerDevices, device.audio.speakerDevices.get());
            // updateDevices(ringtoneDevices, device.audio.ringtoneDevices.get());
        }
    }
    addDeviceListeners(device) {
        device.on("registered", function () {
            console.log("Twilio.Device Ready to make and receive calls!");
        });

        device.on("error", function (error) {
            console.log("Twilio.Device Error: " + error.message);
        });
        device.on("connect", (connection) => {
            console.log("Successfully established call!", connection);
            this.#connection = connection;
        });
        device.audio.on("deviceChange", this.updateAllAudioDevices.bind(device));
        // Show audio selection UI if it is supported by the browser.
        if (device.audio.isOutputSelectionSupported) {
        }
    }
    makeOutgoingCall(phoneNumber) {
        if (!this.device) {
            console.error('Twilio device not initialized');
            return;
        }

        const params = {
            To: phoneNumber,
            // StreamUrl: this.#streamUrl,
            // Stream: true
        };

        try {
            const call = this.device.connect({ params });
            this.call = call;
            this.setupCallListeners();
        } catch (error) {
            console.error('Failed to make outgoing call:', error);
        }
    }

    acceptIncomingCall() {
        if (!this.call) {
            console.error('No incoming call to accept');
            return;
        }

        const params = {
            StreamUrl: this.#streamUrl,
            Stream: true
        };

        try {
            this.call.accept({ params });
        } catch (error) {
            console.error('Failed to accept incoming call:', error);
        }
    }

    setupCallListeners() {
        if (!this.call) return;
        this.call.on('accept', () => {
            console.log('Call accepted');
            this.events.emit(CALL_EVENTS.ACCEPT);
        });

        this.call.on('disconnect', () => {
            console.log('Call disconnected');
            this.call = null;
            this.events.emit(CALL_EVENTS.DISCONNECT);
            this.#connection = null;
        });

        this.call.on('error', (error) => {
            console.error('Call error:', error);
            this.events.emit(CALL_EVENTS.DISCONNECT);
        });
        this.call.on("mute", (isMuted) => {
            console.log("Call muted:", isMuted);
        });
    }

    endCall() {
        if (this.call) this.call.reject();
        if (this.device) this.device.disconnectAll();
        if (this.#connection) this.#connection.disconnect();
    }
    muteCall() {
        if (this.#connection) this.#connection.mute(true);
    }
    unmuteCall() {
        if (this.#connection) this.#connection.unmute(false);
    }
}