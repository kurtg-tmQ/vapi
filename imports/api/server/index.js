import { Meteor } from "meteor/meteor";

import Server from "../../api/classes/server/Server";
import Sessions from "./Sessions";
import ScrapeUrl from "./ScrapeUrl";

const addServices = (service = {}) => {
    for (let key in service) Server.addFunction(key, service[key]);
};

if (Meteor.isServer) {
    addServices(Sessions);
    addServices(ScrapeUrl);
}