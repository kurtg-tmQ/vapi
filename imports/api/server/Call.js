import { Meteor } from "meteor/meteor";

import { TwilioCall } from "../classes/server/call/twilioCall";
import Utilities from "../classes/server/Utilities";
import DB, { Consumer, Channels } from "../DB";
import { CALL } from "../classes/common/Const";
import Server from "../classes/server/Server";

export default {
    [CALL.GET_TOKEN]: async function (identity) {
        Utilities.showDebug("Get Token: ", identity, Server.Config.inboundNumber);
        try {
            if (Server.Config.inboundNumber) {
                const channel = DB.Channels.findOne({ number: Server.Config.inboundNumber });
                if (!channel) throw new Error("No Channel Found");
                const ch = new Channels(channel);
                const tw = new TwilioCall(ch.Api.key, ch.Api.secret, ch.number);
                return tw.getToken(identity);
            }
            throw new Error("No Inbound Number Found");
        } catch (error) {
            throw new Meteor.Error(error.message || error.reason || error);
        }
    }
};
