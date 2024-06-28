import { FuncTemplate } from "./template";
import DB, { Consumer } from "../../../DB";
import Utilities from "../Utilities";
import Server from "../Server";

class FirstLastName extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }
    /**
     * 
     * @param {String} firstName 
     * @param {String} lastName 
     * @returns 
     */
    verifyFirstLastName(firstName, lastName) {
        if (this.Data) {
            const consumer = new Consumer(this.Data);
            return consumer.verifyFirstLastName(firstName, lastName);
        } else {
            const first = new RegExp(`${firstName} ${lastName}`, "i");
            const firstOnly = new RegExp(firstName, "i");
            const lastOnly = new RegExp(lastName, "i");
            const businessId = new Mongo.ObjectID("52b102029fd56ada5b3ea3bd");
            let existing = null;
            let query = { businessId, first: firstOnly, partial: lastName.toUpperCase() };
            let sort = { createdAt: -1 };

            existing = Server.RemoteDB.getCollection("consumer_info").findOne(query);
            // if (!existing) {
            //     query = { businessId, first };
            //     console.time("2nd query")
            //     existing = Server.RemoteDB.getCollection("consumer_info").findOne(query);
            //     console.timeEnd("2nd query")
            // }
            if (!existing) {
                query = { firstName: firstOnly, lastName: lastOnly };
                existing = DB.Consumers.findOne(query);
            }
            if (existing) {
                const billingInfo = Server.RemoteDB.getCollection("billings").findOne({ consumerNumber: existing.consumerNumber }, { sort });
                if (billingInfo) {
                    const account = Consumer.Default.account;
                    const consumer = new Consumer({
                        firstName: billingInfo.firstName,
                        lastName: billingInfo.lastName,
                        account: {
                            cardNumber: Utilities.getLast4Digits(billingInfo.account_identifier || Consumer.Default.account.cardNumber),
                            sss: account.sss,
                            status: account.sss,
                        },
                        contactInfo: { mobile: existing.consumerNumber }
                    });
                    consumer.saveTemp();
                    this.setData(consumer.toObject());
                    return true;
                }
            }
        }
        return false;
    }
    parseRequest(requestBody) {
        let argument = requestBody.message.toolCalls[0].function.arguments;
        const verified = this.verifyFirstLastName(argument.firstname, argument.lastname);
        if (verified) {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "Exist.",
                    },
                ],
            }, true);
        } else {
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: requestBody.message.toolCalls[0].id,
                        result: "Not Exist.",
                    },
                ],
            });
        }
        return this.checkResponse();
    }
}

const verifyUser = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Checking ...",
        },
        {
            type: "request-response-delayed",
            content: "Hold on a second",
            timingMilliseconds: 2000,
        },
    ],
    function: {
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
        description: "Check user if they exist on database or not",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/verify_name",
    },
};
const meta = {
    title: "First and Last Name",
    systemMsg: "Verifying First and Last Name",
};

export default new FirstLastName(false, verifyUser.server, verifyUser.messages, verifyUser.function, meta);