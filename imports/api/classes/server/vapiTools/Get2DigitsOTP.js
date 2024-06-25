import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class Get2DigitsOTP extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    verifyRequest() {
        const data = this.Data;
        if (data) {
            const consumer = new Consumer(data);
            return consumer.getLast2digitsOfOTP(this.Meta.sessionId);
        }
        return Promise.resolve("expired");
    }

    parseRequest(request) {
        return this.verifyRequest().then((response) => {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: response,
                    },
                ],
            }, response !== "expired" ? true : false);
            return this.checkResponse();
        }).catch((e) => {
            console.error(e);
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "expired",
                    },
                ],
            });
            return this.checkResponse();
        });
    }
}
const otp = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Getting OTP...",
        },
        {
            type: "request-response-delayed",
            content: "Just a second...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "get_2_digits_otp",
        parameters: {
            type: "object",
            properties: {},
        },
        description:
            "This function returns the last 2 digits of the OTP for the current session. If the OTP has expired, it returns 'expired'.",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/card_num",
    },
};
const meta = {
    title: "Get 2 digits OTP",
    systemMsg: "Getting 2 digits OTP",
};

export default new Get2DigitsOTP(otp.async, otp.server, otp.messages, otp.function, meta);