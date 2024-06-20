import { FuncTemplate } from "./template";
import DB from "../../../DB";

class ZipCodeTemp extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    parseRequest(requestBody) {
        let argument = requestBody.message.toolCalls[0].function.arguments;
        const data = this.Data;
        try {
            const zip = parseInt(argument.zipcode);
            if (isNaN(zip)) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "not valid",
                        },
                    ],
                });
            } else if (zip === parseInt(data.zipcode)) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "valid",
                        },
                    ],
                }, true);
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "not valid",
                        },
                    ],
                });
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
            content: "Updating ...",
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
            "Verify zipcode. This will return valid or not valid",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/zipCodeUpdate",
    },
};
const meta = {
    title: "Zip Code",
};

export default new ZipCodeTemp(false, zipcode.server, zipcode.messages, zipcode.function, meta);