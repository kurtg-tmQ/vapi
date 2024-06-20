import { FuncTemplate } from "./template";

class PasswordVerify extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    verifyRequest(password) {
        let retval = false;
        const data = this.Data;
        if (data) {
            if (data.password.toLowerCase() === password.toLowerCase()) retval = true;
        }
        return retval;
    }

    parseRequest(request) {
        const { password } = request.message.toolCalls[0].function.arguments;
        if (this.verifyRequest(password)) {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "Successfully verified.",
                    },
                ],
            }, true);
        } else {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "Incorrect password.",
                    },
                ],
            });

        }
        return this.checkResponse();
    }
}
const args = {
    cardNum: {
        messages: [
            {
                "type": "request-start",
                "content": "Verifying number."
            },
            {
                "type": "request-failed",
                "content": "Sorry, there seems to have been an error."
            },
            {
                "type": "request-response-delayed",
                "content": "It appears there is some delay in check our database.",
                "timingMilliseconds": 2000
            }
        ],
        serv: {
            url: `https://api.example.com/card_num`,
        },
        func: {
            name: "retrieve_card_number",
            parameters: {
                type: "object",
                properties: {
                    number: {
                        type: "string",
                    }
                },
            },
            description: "Retrieves card number.",
        }
    },
    verifyPass: {
        messages: [
            {
                "type": "request-start",
                "content": "Verifying your password."
            },
            {
                "type": "request-failed",
                "content": "Sorry, there is something wrong on our server."
            },
            {
                "type": "request-response-delayed",
                "content": "It appears there is some delay in check our database.",
                "timingMilliseconds": 2000
            }
        ],
        serv: {
            url: "https://api.example.com",
        },
        func: {
            "name": "verify_account_password",
            "parameters": {
                "type": "object",
                "properties": {
                    "password": {
                        "type": "string"
                    }
                }
            },
            "description": "Retrieves account password."
        }
    }
};
const meta = {
    title: "Password (if applicable)",
};

export default new PasswordVerify(false, args.verifyPass.serv, args.verifyPass.messages, args.verifyPass.func, meta);