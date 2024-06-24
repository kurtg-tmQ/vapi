import { Meteor } from "meteor/meteor";
import { SESSION, SESSION_EVENTS } from "../classes/common/Const";
import Server from "../classes/server/Server";

export default {
    [SESSION.GET_TRANSCRIPT]: async function (sessionId) {
        console.log("Get Transcript: ", sessionId);
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
