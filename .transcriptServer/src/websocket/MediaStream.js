import { TranscriptionService } from "../services/Transcription.js";
import RedisManager from '../services/RedisManager.js';
import GptManager from '../services/GptManager.js';
import Logger from "../helpers/Logger.js";
import dotenv from 'dotenv';
dotenv.config();

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

class TranscriptEvents {
    #interactionCount = 0;
    #txtRef = {};
    #texts = [];
    #current = null;
    #timeout = null;
    #gpt = GptManager.getGptService();
    /**
     * 
     * @param {String} direction 
     * @param {TranscriptionService} instance 
     */
    constructor(direction, instance) {
        this.direction = direction;
        this.instance = instance;
        this.setupEvents();
    }
    poolMessage() {
        if (this.#timeout) clearTimeout(this.#timeout);
        this.#timeout = setTimeout(() => {
            const message = this.#texts.join(" ").replace(/•/g, "");
            this.sendRedisResponse(message, "coach");
            this.#texts = [];
        }, 1000);
    }
    setupEvents() {
        Logger.showDebug(`Setting up events for ${this.direction}`);
        if (!this.instance) return;
        switch (this.direction) {
            case "inbound": {
                this.instance.on('utterance', async (text) => {
                    // This is a bit of a hack to filter out empty utterances
                    if (text?.length > 5) {
                        console.log('Twilio -> Interruption, Clearing stream'.red, this.direction);
                    }
                });
                this.instance.on('transcription', async (text) => {
                    if (!text) { return; }
                    console.log(`Interaction ${this.#interactionCount} – STT -> GPT: ${text}`.yellow);
                    this.#interactionCount += 1;
                    this.sendRedisResponse(text, "user");
                    this.#gpt.completion(text, this.#interactionCount);
                });
                this.#gpt.on('gptreply', async (gptReply, icount) => {
                    console.log(`Interaction ${icount}: GPT -> TTS: ${gptReply.partialResponse}`.green, gptReply.partialResponseIndex);
                    if (!this.#txtRef[gptReply.partialResponseIndex]) {
                        this.#txtRef[gptReply.partialResponseIndex] = true;
                        if (this.#current == gptReply.createdAt) {
                            this.#texts.push(gptReply.partialResponse);
                        } else {
                            this.#current = gptReply.createdAt;
                            this.#texts.push(gptReply.partialResponse);
                        }
                        const message = this.#texts.join(" ").replace(/•/g, "");
                        this.sendRedisResponse(message, "coach", "partial");
                    }
                    this.poolMessage();
                });
                break;
            }
            case "outbound": {
                this.instance.on('transcription', async (text) => {
                    this.sendRedisResponse(text, "assistant");
                });
                break;
            }
        }
    }
    sendRedisResponse(message, role = "user", transcriptType = "final") {
        RedisManager.publish("GPT_MESSAGE", { message, role, transcriptType });
    }
}

export class MediaStream {
    #transcriptions = {};
    #listeners = {};
    #id;
    #gpt = null;
    #closeCallback = () => { };
    constructor(connection, id, closeCallback) {
        this.connection = connection;
        this.#id = id;
        connection.on("message", this.processMessage.bind(this));
        connection.on("close", this.close.bind(this));
        this.streamSid = null;
        if (typeof closeCallback === "function") {
            this.#closeCallback = closeCallback;
        }
    }
    /**
     * 
     * @param {String} direction 
     * @returns {TranscriptionService}
     */
    getTranscription(direction) {
        if (!this.#transcriptions[direction])
            this.#transcriptions[direction] = new TranscriptionService(DEEPGRAM_API_KEY, direction);
        return this.#transcriptions[direction];
    }

    startListening(direction) {
        const instance = this.getTranscription(direction);
        if (!this.#listeners[direction] && instance) {
            this.#listeners[direction] = new TranscriptEvents(direction, instance);
        }
    }

    processMessage(message) {
        // Convert Buffer to string
        const messageString = message.toString('utf8');

        try {
            const data = JSON.parse(messageString);
            switch (data.event) {
                case "connected":
                    Logger.showDebug("From Twilio: Connected event received: ", data);
                    break;
                case "start":
                    GptManager.init();
                    this.#gpt = GptManager.getGptService();
                    this.#gpt.setCallSid(data.start.callSid);
                    Logger.showDebug("From Twilio: Start event received: ", data);
                    this.streamSid = data.start.streamSid;
                    if (this.#gpt.FirstMessage) {
                        RedisManager.publish("GPT_MESSAGE", { message: this.#gpt.FirstMessage, role: "coach" });
                    }
                    const tracks = data?.start?.tracks;
                    if (tracks && tracks.length > 0) {
                        tracks.forEach((track) => {
                            this.startListening(track);
                        });
                    }
                    break;
                case "media":
                    const direction = data.media.track;
                    const transcription = this.getTranscription(direction);
                    transcription.send(data.media.payload);
                    break;
                case "mark":
                    Logger.showDebug("From Twilio: Mark event received", data);
                    break;
                case "stop":
                    Logger.showDebug("From Twilio: Stop event received: ", data);
                    this.close();
                    break;
                default:
                    Logger.showDebug("From Twilio: Unknown event received: ", data);
            }
        } catch (error) {
            Logger.showDebug("Error processing message: ", error);
            Logger.showDebug("Raw message: ", messageString);
        }
    }
    sendUTFResponse(payload, streamSid) {
        const message = JSON.stringify({
            event: "media",
            streamSid,
            media: {
                payload
            }
        });
        if (this.connection) {
            this.connection.sendUTF(message);
        }
    }

    close() {
        Logger.showDebug("Server: Closed", this.streamSid);
        for (const direction in this.#transcriptions) {
            delete this.#transcriptions[direction];
        }
        for (const direction in this.#listeners) {
            delete this.#listeners[direction];
        }
        this.#closeCallback(this.#id);
        GptManager.onClose();
    }
}