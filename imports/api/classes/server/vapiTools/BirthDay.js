import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";
import moment from "moment";

class BirthDay extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    verifyBirthday(birthday) {
        if (this.Data) {
            const consumer = new Consumer(this.Data);
            return consumer.verifyBirthday(birthday);
        }
        return false;
    }
    parseRequest(requestBody) {
        try {
            let argument = requestBody.message.toolCalls[0].function.arguments;
            if (this.verifyBirthday(argument.birthday))
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "valid.",
                        },
                    ],
                }, true);
            else
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "not valid.",
                        },
                    ],
                });
        } catch (error) {
            this.setResponse(500, {
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
const birthday = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Updating ...",
        },
        {
            type: "request-response-delayed",
            content: "Give me a minute...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "birthday_update",
        parameters: {
            type: "object",
            properties: {
                birthday: {
                    type: "string",
                },
            },
        },
        description:
            "Validates birthday of customer. This will return if it is valid or not valid",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/birthdayUpdate",
    },
};
const meta = {
    title: "Date of Birth",
    systemMsg: "Validating Date of Birth",
};

export default new BirthDay(birthday.async, birthday.server, birthday.messages, birthday.function, meta);