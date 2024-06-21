import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class LastSssNumTemp extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    validate(sss) {
        const data = this.Data;
        if (data) {
            const consumer = new Consumer(data);
            return consumer.verifySss(sss);
        }
        return false;
    }
    parseRequest(requestBody) {
        try {
            let argument = requestBody.message.toolCalls[0].function.arguments;
            const isVerified = this.validate(argument.sssNumber);
            const sss = parseInt(argument.sssNumber);
            if (isNaN(sss) || argument.sssNumber.length != 4 || !isVerified) {
                this.setResponse(
                    200,
                    {
                        results: [
                            {
                                toolCallId: requestBody.message.toolCalls[0].id,
                                result: "Incorrect",
                            },
                        ],
                    },
                    true
                );
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "Correct",
                        },
                    ],
                });
            }
        } catch (error) {
            this.setResponse(400, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "Error",
                    },
                ],
            });
        }
        return this.checkResponse();
    }
}
const sss = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Verifying ...",
        },
        {
            type: "request-response-delayed",
            content: "One moment, please...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "sss_verify",
        parameters: {
            type: "object",
            properties: {
                sssNumber: {
                    type: "string",
                },
            },
        },
        description:
            "Validate last 4 digits of social security number if correct or not",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/sssUpdate",
    },
};
const meta = {
    title: "Last 4 of the Social Security Number",
};

export default new LastSssNumTemp(sss.async, sss.server, sss.messages, sss.function, meta);