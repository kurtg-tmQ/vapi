import DB, { Consumer } from "../../../DB";
import { FuncTemplate } from "./template";
import Utilities from "../Utilities";
import Server from "../Server";

class CheckCellPhone extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    checkCellPhoneNumber() {
        const consumerNumber = this.Meta.consumerNumber;
        // const billing = RemoteDatabase.getCollection("billings");
        const isExist = Server.RemoteDB.getCollection("billings").findOne({ consumerNumber, account_identifier: { $exists: true } }, { sort: { createdAt: -1 } });
        if (isExist) {
            const defaultAccount = Consumer.Default.account;
            const consumer = new Consumer({
                firstName: isExist.firstName,
                lastName: isExist.lastName,
                account: {
                    cardNumber: Utilities.getLast4Digits(isExist.account_identifier),
                    sss: defaultAccount.sss,
                    status: defaultAccount.status,
                },
                contactInfo: { mobile: consumerNumber }
            });
            consumer.saveTemp();
            this.setData(consumer.toObject());
            return Promise.resolve({ verified: true });
        }
        return Promise.resolve({ verified: false });
    }

    parseRequest(request) {
        return this.checkCellPhoneNumber().then(({ verified, result }) => {
            if (verified) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: {
                                success: true,
                                message: "Exist"

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
                                message: "Not Exists"
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
        });
    }
}
const phone = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Checking your phone number...",
        },
        {
            type: "request-response-delayed",
            content: "Just a second...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "check_cell_phone_number",
        parameters: {
            type: "object",
            properties: {
            },
        },
        description:
            "Checks the phone number if it exist or not exists on the database",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/card_replacement",
    },
};
const meta = {
    title: "Cell Phone Checking",
    systemMsg: "Getting consumer info",
};

export default new CheckCellPhone(phone.async, phone.server, phone.messages, phone.function, meta);