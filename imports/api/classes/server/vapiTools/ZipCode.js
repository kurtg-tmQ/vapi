import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class ZipCodeTemp extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    verifyRequest(zipcode) {
        const data = this.Data;
        if (data) {
            const consumer = new Consumer(data);
            return consumer.verifyZipCode(zipcode);
        }
        return false;
    }

    parseRequest(requestBody) {
        let argument = requestBody.message.toolCalls[0].function.arguments;
        try {
            if (!this.verifyRequest(argument.zipcode)) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "not valid",
                        },
                    ],
                });
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "valid",
                        },
                    ],
                }, true);
            }
        } catch (error) {
            this.setResponse(400, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "error",
                    },
                ],
            });
        }
        return this.checkResponse();
    }
}

const zipcode = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Validating ...",
        },
        {
            type: "request-response-delayed",
            content: "Hang on...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "zipcode_update",
        parameters: {
            type: "object",
            properties: {
                zipcode: {
                    type: "string",
                },
            },
        },
        description:
            "Validate zipcode. This will return valid or not valid",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/zipCodeUpdate",
    },
};
const meta = {
    title: "Zip Code",
    systemMsg: "Verifying Zip Code",
};

export default new ZipCodeTemp(false, zipcode.server, zipcode.messages, zipcode.function, meta);