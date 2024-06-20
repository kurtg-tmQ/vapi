import { FuncTemplate } from "./template";

class TaskRoute extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    parseRequest(requestBody) {
        let argument = requestBody.message.toolCalls[0].function.arguments;
        console.log("TaskRoute -> parseRequest -> argument", argument, requestBody);
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
        content: "Transferring call please wait.",
    },
    {
        type: "request-failed",
        content: "Sorry, there is something wrong on our server.",
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
                type: "string",
            }
        },
    },
    description: "Provide the destination and the assistant id for the transfer.",
};
const meta = {
    title: "Transfer call according to request.",
};

export default new TaskRoute(false, serv, messages, func, meta);