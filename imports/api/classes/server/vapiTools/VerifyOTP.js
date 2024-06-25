import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class VerifyOTP extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    verifyRequest(number) {
        const data = this.Data;
        if (data) {
            const consumer = new Consumer(data);
            return consumer.verifyOTP(number, this.Meta.sessionId);
        }
        return Promise.resolve("invalid");
    }

    parseRequest(request) {
        const { code } = request.message.toolCalls[0].function.arguments;
        return this.verifyRequest(code).then((response) => {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: response,
                    },
                ],
            }, response === "valid" ? true : false);
            return this.checkResponse();
        }).catch((e) => {
            console.error(e);
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "invalid",
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
            content: "Verifying otp...",
        },
        {
            type: "request-response-delayed",
            content: "Just a second...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "verify_otp",
        parameters: {
            type: "object",
            properties: {
                code: {
                    type: "string",
                },
            },
        },
        description:
            "Verify the OTP code. Returns 'valid' if the code is correct, 'invalid' if the code is incorrect, and 'used' if the code has already been used.",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/card_num",
    },
};
const meta = {
    title: "Verify OTP",
    systemMsg: "Validating OTP",
};

export default new VerifyOTP(otp.async, otp.server, otp.messages, otp.function, meta);