import { FuncTemplate } from "./template";

class TransferCall extends FuncTemplate {
    constructor(async, server, messages, func, meta, otherInfo) {
        super(async, server, messages, func, meta, otherInfo);
    }
    parseRequest(requestBody) {
        this.setResponse(200, {
            results: [
                {
                    toolCallId: requestBody.message.toolCalls[0].id,
                    result: "success",
                },
            ],
        }, true);
        return this.checkResponse();
    }
}
const phonenumber = "+18888519164";
// const phonenumber = "+19196126600";
const transferCall = {
    async: false,
    type: "transferCall",
    destinations: [
        {
            "type": "phoneNumber",
            "number": phonenumber,
            "message": "I am forwarding your call to Account Service to further assist you. Please stay on the line."
        },
    ],
    function: {
        name: "transferCall",
        description: "Use this function to transfer the call. Only use it when following instructions that explicitly ask you to use the transferCall function. DO NOT call this function unless you are instructed to do so.",
        "parameters": {
            type: "object",
            properties: {
                destination: {
                    type: "string",
                    enum: [phonenumber],
                    description: "The destination to transfer the call to."
                }
            },
            required: ["destination"]
        }
    },
    messages: [
        {
            "type": "request-start",
            "content": "I am forwarding your call to Department A. Please stay on the line.",
            "conditions": [
                {
                    "param": "destination",
                    "operator": "eq",
                    "value": "+1234567890"
                }
            ]
        },
        {
            "type": "request-start",
            "content": "I am forwarding your call to Department B. Please stay on the line.",
            "conditions": [
                {
                    "param": "destination",
                    "operator": "eq",
                    "value": "+0987654321"
                }
            ]
        },
        {
            "type": "request-start",
            "content": "I am forwarding your call to Department C. Please stay on the line.",
            "conditions": [
                {
                    "param": "destination",
                    "operator": "eq",
                    "value": "+1122334455"
                }
            ]
        }
    ],
    server: {
        url: "https://api.vonage.com/v1/call/transfer",
    }
};
const meta = {
    title: "Transfer Call to Account Service",
    systemMsg: "Forward call to account service.",
};

export default new TransferCall(transferCall.async, transferCall.server, transferCall.messages, transferCall.function, meta, { type: transferCall.type, destinations: transferCall.destinations });

