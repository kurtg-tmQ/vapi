import { FuncTemplate } from "./template";
import moment from "moment";


class BirthDay extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    parseRequest(requestBody) {
        const data = this.Data;
        const birthday = moment(data.birthday, "YYYY-MM-DD");
        console.log("BirthDay -> parseRequest -> birthday", birthday, data);
        try {
            let argument = requestBody.message.toolCalls[0].function.arguments;
            const newBirthday = moment(argument.birthday, "YYYY-MM-DD");
            if (birthday.isSame(newBirthday))
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "Your birthday is valid.",
                        },
                    ],
                }, true);
            else
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: requestBody.message.toolCalls[0].id,
                            result: "Your birthday is not valid.",
                        },
                    ],
                });
        } catch (error) {
            this.setResponse(500, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "The is a problem updating your birthday.",
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
        content: "Validating your birthday on your account.",
    },
    {
        type: "request-failed",
        content: "Sorry , there is something wrong on our server.",
    },
    {
        type: "request-response-delayed",
        content: "It appears there is some delay updating your birthday.",
        timingMilliseconds: 2000,
    },
];
const serv = {
    url: "https://kind-intensely-herring.ngrok-free.app/birthdayUpdate",
};
const func = {
    name: "birthday_update",
    parameters: {
        type: "object",
        properties: {
            birthday: {
                type: "string",
            },
        },
    },
    description: "Verify birthday on account.",
};
const meta = {
    title: "Date of Birth",
};

export default new BirthDay(false, serv, messages, func, meta);