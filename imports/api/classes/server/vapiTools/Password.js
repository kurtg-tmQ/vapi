import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class PasswordVerify extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    verifyRequest(password) {
        const data = this.Data;
        if (data) {
            const consumer = new Consumer(data);
            return consumer.verifyPassword(password);
        }
        return false;
    }

    parseRequest(request) {
        const { password } = request.message.toolCalls[0].function.arguments;
        if (this.verifyRequest(password)) {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "Correct",
                    },
                ],
            }, true);
        } else {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "Not correct",
                    },
                ],
            });

        }
        return this.checkResponse();
    }
}
const password = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Verifying...",
        },
        {
            type: "request-response-delayed",
            content: "Hold on a moment...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "verify_account_password",
        parameters: {
            type: "object",
            properties: {
                password: {
                    type: "string",
                },
            },
        },
        description:
            "Retrieves account password and check if it is correct or not.",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/verify_pass",
    },
};
const meta = {
    title: "Password (if applicable)",
};

export default new PasswordVerify(password.async, password.server, password.messages, password.function, meta);