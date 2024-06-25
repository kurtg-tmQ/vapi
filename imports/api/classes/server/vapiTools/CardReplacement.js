import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class CardReplacement extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    verifyRequest(formData) {
        const data = this.Data;

        if (data) {
            const consumer = new Consumer(data);
            return consumer.processCardReplacement(formData);
        }
        return Promise.resolve({ verified: false });
    }

    parseRequest(request) {
        const formData = request.message.toolCalls[0].function.arguments;

        return this.verifyRequest(formData).then(({ verified, result }) => {
            if(verified) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: {
                                success: true,
                                dateRange: result
                            }
                        },
                    ],
                }, true);
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: {
                                success: false,
                                message: "Process failed. Please try again later"
                            },
                        },
                    ],
                });
            }
            return this.checkResponse();
        }).catch((e) => {
            console.log(e);
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: {
                            success: false,
                            message: "Process failed. Please try again later"
                        },
                    },
                ],
            });
            return this.checkResponse();
        })
    }
}
const card = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Processing request...",
        },
        {
            type: "request-response-delayed",
            content: "Just a second...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "process_card_replacement",
        parameters: {
            type: "object",
            properties: {
                address: {
                    type: "string"
                }
            }
        },
        description:
            "Process card replacement and returns possible delivery dates.",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/card_replacement",
    },
};
const meta = {
    title: "Update account address.",
};

export default new ChangeAddress(card.async, card.server, card.messages, card.function, meta);