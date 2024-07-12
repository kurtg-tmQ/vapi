import { Meteor } from "meteor/meteor";
import { SCRAPE } from "../classes/common/Const";
import Server from "../classes/server/Server";

export default {
    [SCRAPE.SCRAPE_URL]: async function (url) {
        try {
            await Server.Vapi.updateAssistantFile(url)
            return;
        } catch (error) {
            console.log("Erorrrr", error.message);
            throw new Meteor.Error('scrape-failed', error.message)
        }
    }
}