import { FuncTemplate } from "./template";
import DB from "../../../DB";

class FirstLastName extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    verifyFirstLastName(firstName, lastName) {
        const firstname = new RegExp(firstName, "i");
        const lastname = new RegExp(lastName, "i");
        const exist = DB.Consumers.findOne({ firstName: { $regex: firstname }, lastName: { $regex: lastname } });
        if (exist) this.setData(exist);
        return !!exist;
    }
    parseRequest(requestBody) {
        let argument = requestBody.message.toolCalls[0].function.arguments;
        const verified = this.verifyFirstLastName(argument.firstname, argument.lastname);
        if (verified) {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "Exist.",
                    },
                ],
            }, true);
        } else {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "Not Exist.",
                    },
                ],
            });
        }
        return this.checkResponse();
    }
}

const verifyUser = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Checking ...",
        },
        {
            type: "request-response-delayed",
            content: "Wait a sec...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "verify_user",
        parameters: {
            type: "object",
            properties: {
                firstname: {
                    type: "string",
                },
                lastname: {
                    type: "string",
                },
            },
        },
        description: "Check user if they exist on database or not",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/verify_name",
    },
};
const meta = {
    title: "First and Last Name",
};

export default new FirstLastName(false, verifyUser.server, verifyUser.messages, verifyUser.function, meta);