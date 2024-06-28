import DB, { Consumer, Channels } from "../../../DB";
import { TwilioCall } from "../call/twilioCall";
import { FuncTemplate } from "./template";
import Utilities from "../Utilities";
import Server from "../Server";

class CallForwarding extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    forwardCall() {
        const channel = DB.Channels.findOne({ businessId: Consumer.Default.inboundBusinessId });
        if (!channel) return Promise.reject("no channel");
        const ch = new Channels(channel);
        const tw = new TwilioCall(ch.Api.key, ch.Api.secret, ch.number);
        const callSid = this.Meta.sessionId;
        const to = Server.Config.forwardingPhoneNumber;
        if (tw.isAValidPhoneNumber(to)) return tw.forwardCall(to, callSid);
        return Promise.reject("invalid number");
    }
    parseRequest(requestBody) {
        return this.forwardCall().then((to) => {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "success",
                    },
                ],
            }, true, { to });
            return this.checkResponse();
        }).catch((e) => {
            Utilities.showError("Error forwarding call: %s", e.message || e);
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "failed",
                    },
                ],
            });
            return this.checkResponse();
        });
    }
}
const callForward = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Transferring your call...",
        },
        {
            type: "request-response-delayed",
            content: "Give me a minute...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "call_forwarding",
        parameters: {
            type: "object",
            properties: {}
        },
        description: "Forward the call when maximum retries are reached.",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/birthdayUpdate",
    },
};
const meta = {
    title: "Call Forwarding",
    systemMsg: "Forward call to account service.",
};

export default new CallForwarding(callForward.async, callForward.server, callForward.messages, callForward.function, meta);