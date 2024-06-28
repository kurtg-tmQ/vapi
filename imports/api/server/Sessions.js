import { Meteor } from "meteor/meteor";
import { SESSION, SESSION_EVENTS } from "../classes/common/Const";
import Server from "../classes/server/Server";
import Utilities from "../classes/server/Utilities";

export default {
    [SESSION.GET_TRANSCRIPT]: async function (sessionId) {
        Utilities.showDebug("Get Transcript: ", { sessionId, info: { ...this.connection, userId: this.userId } });
        try {
            if (sessionId) {
                Server.Vapi.Event.emit(SESSION_EVENTS.START, sessionId);
            } else {
                const sessions = Server.Vapi.SessionsIds;
                Server.Vapi.Event.emit(SESSION_EVENTS.START, sessions[0]);
            }
        } catch (error) {
            throw new Meteor.Error(error.message || error.reason || error);
        }
    }
};
