import { FuncTemplate } from "./template";
import DB from "../../../DB";

class FirstLastName extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    verifyFirstLastName(firstName, lastName) {
        const firstname = new RegExp(firstName, "i");
        const lastname = new RegExp(lastName, "i");
        const exist = DB.Consumers.findOne({ firstname: { $regex: firstname }, lastname: { $regex: lastname } });
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
                        result: "Your name exist in our database.",
                    },
                ],
            }, true);
        } else {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "I'm sorry the information you provided does not exist in our database.",
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
        content: "Checking the database for existing accounts.",
    },
    {
        type: "request-failed",
        content: "Sorry , there is something wrong on our server.",
    },
    {
        type: "request-response-delayed",
        content: "It appears there is some delay in check our database.",
        timingMilliseconds: 2000,
    },
];
const serv = {
    url: "https://api.example.com",
};
const func = {
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
    description: "Retrieves the user from database.",
};
const meta = {
    title: "First and Last Name",
};

export default new FirstLastName(false, serv, messages, func, meta);