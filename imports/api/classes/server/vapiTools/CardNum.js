import { FuncTemplate } from "./template";

class CardNum extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    verifyRequest(number) {
        const retval = { verified: false, passRequired: false };
        const data = this.Data;
        if (data) {
            if (parseInt(data.cardnumber) === parseInt(number)) retval.verified = true;
            if (data.passwordrequired) retval.passRequired = true;
        }
        return retval;
    }

    parseRequest(request) {
        const { number } = request.message.toolCalls[0].function.arguments;
        const { verified, passRequired } = this.verifyRequest(number);
        if (verified) {
            if (!passRequired) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: "Card number verified and password is not required",
                        },
                    ],
                }, true);
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: "Card verified but ask for account's password.",
                        },
                    ],
                }, true);
            }
        } else {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "Card number not valid.",
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
    title: "Last four (4) Card Number/Account Number (if they have it)",
};

export default new CardNum(false, args.cardNum.serv, args.cardNum.messages, args.cardNum.func, meta);