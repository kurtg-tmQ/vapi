import { Meteor } from "meteor/meteor";
import { CALL } from "../classes/common/Const";
import Utilities from "../classes/server/Utilities";
import DB, { Consumer, Channels } from "../DB";
import { TwilioCall } from "../classes/server/call/twilioCall";

export default {
    [CALL.GET_TOKEN]: async function (identity) {
        Utilities.showDebug("Get Token: ", identity);
        try {
            const channel = DB.Channels.findOne({ businessId: Consumer.Default.inboundBusinessId });
            if (!channel) return Promise.reject("no channel");
            const ch = new Channels(channel);
            const tw = new TwilioCall(ch.Api.key, ch.Api.secret, ch.number);
            return tw.getToken(identity);
        } catch (error) {
            throw new Meteor.Error(error.message || error.reason || error);
        }
    }
};
