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
        // const firstname = new RegExp(firstName, "i");
        // const lastname = new RegExp(lastName, "i");
        // const exist = DB.Consumers.findOne({ firstName: { $regex: firstname }, lastName: { $regex: lastname } });
        // const consumerNumber = this.Meta.consumerNumber;
        // const isExist = RemoteDB.getCollection("billings").findOne({ consumerNumber });

        const first = new RegExp(`${firstName} ${lastName}`, "i");
        const businessId = new Mongo.ObjectID("52b102029fd56ada5b3ea3bd");
        const isExist = Server.RemoteDB.getCollection("consumer_info").findOne({ businessId, first });
        if (isExist) {
            const billingInfo = Server.RemoteDB.getCollection("billings").findOne({ consumerNumber: isExist.consumerNumber });
            if (billingInfo) {
                const account = Consumer.Default.account;
                const consumer = new Consumer({
                    firstName: billingInfo.firstName,
                    lastName: billingInfo.lastName,
                    account: {
                        cardNumber: Utilities.getLast4Digits(billingInfo.account_identifier),
                        sss: account.sss,
                        status: account.sss,
                    },
                    contactInfo: { mobile: isExist.consumerNumber }
                });
                consumer.saveTemp();
                this.setData(consumer.toObject());
                return true;
            }
        }
        // if (isExist) {
        //     const account = Consumer.Default.account;
        //     const consumer = new Consumer({
        //         firstName: isExist.firstName,
        //         lastName: isExist.lastName,
        //         account: {
        //             cardNumber: getLast4Digits(isExist.account_identifier),
        //             sss: account.sss,
        //             status: account.sss,
        //         },
        //         contactInfo: { mobile: consumerNumber }
        //     });
        //     consumer.saveTemp();
        //     this.setData(consumer.toObject());
        // }
        // if (exist) this.setData(exist);
        // return !!exist;
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
            content: "Wait a sec...",
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