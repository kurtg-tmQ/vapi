import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class CardNum extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    verifyRequest(number) {
        const retval = { verified: false, passRequired: false };
        const data = this.Data;
        if (data) {
            const consumer = new Consumer(data);
            retval.passRequired = consumer.requirePassword();
            retval.verified = consumer.verifyCardNumber(number);
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
                            result: "Card number exist and DOES NOT requires password",
                        },
                    ],
                }, true);
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: "Card exist BUT requires password.",
                        },
                    ],
                }, true);
            }
        } else {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: "Card number not exist",
                    },
                ],
            });
        }

        return this.checkResponse();
    }
}
const card = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Verifying number...",
        },
        {
            type: "request-response-delayed",
            content: "Just a second...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "retrieve_card_number",
        parameters: {
            type: "object",
            properties: {
                number: {
                    type: "string",
                },
            },
        },
        description:
            "Retrieves card number and verify it. This will check if the card exist and if it require password or not.",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/card_num",
    },
};
const meta = {
    title: "Last four (4) Card Number/Account Number (if they have it)",
};

export default new CardNum(card.async, card.server, card.messages, card.function, meta);