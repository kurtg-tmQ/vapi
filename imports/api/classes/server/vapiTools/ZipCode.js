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
                            result: "Your zip code is not valid.",
                        },
                    ],
                });
            } else if (zip === parseInt(data.zipcode)) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "Your zip code is valid",
                        },
                    ],
                }, true);
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "Your zip code is not valid.",
                        },
                    ],
                });
            }
        } catch (error) {
            this.setResponse(400, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "There was an error while updating your zipcode.",
                    },
                ],
            });
        }
        return this.checkResponse();
    }
}

const messages = [
    {
        type: "request-start",
        content: "Checking your zip code...",
    },
    {
        type: "request-failed",
        content: "Sorry , there is something wrong on our server.",
    },
    {
        type: "request-response-delayed",
        content:
            "It appears there is some delay veiriying and updating your zip code.",
        timingMilliseconds: 2000,
    },
];
const serv = {
    url: "https://kind-intensely-herring.ngrok-free.app/birthdayUpdate",
};
const func = {
    name: "zipcode_update",
    parameters: {
        type: "object",
        properties: {
            zipcode: {
                type: "string",
            },
        },
    },
    description: "Verify zipcode on account.",
};
const meta = {
    title: "Zip Code",
};

export default new ZipCodeTemp(false, serv, messages, func, meta);