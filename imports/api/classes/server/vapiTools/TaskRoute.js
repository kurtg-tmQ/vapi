import { FuncTemplate } from "./template";

class TaskRoute extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    parseRequest(requestBody) {
        let argument = requestBody.message.toolCalls[0].function.arguments;
        this.setResponse(
            200,
            { results: [{ toolCallId: requestBody.message.toolCalls[0].id, result: "SUCCESS", }] },
            true,
            { destination: argument.destination }
        );
        return this.checkResponse();
    }
}

const messages = [
    {
        type: "request-start",
        content: "I will just set up the destination for your call.",
    },
    {
        type: "request-response-delayed",
        content: "It appears there is some delay transferring the call.",
        timingMilliseconds: 4000,
    },
];


const serv = {
    url: "https://kind-intensely-herring.ngrok-free.app/birthdayUpdate",
};
const func = {
    name: "task_route",
    parameters: {
        type: "object",
        properties: {
            destination: {
                type: "string", //name of assistant
            }
        },
    },
    description: "Provide the destination deatails BEFORE transfering the call. This function will send to server the name of choses assistant.",
};
const meta = {
    title: "Transfer call according to request.",
    systemMsg: "Transferring call.",
};

export default new TaskRoute(false, serv, messages, func, meta);