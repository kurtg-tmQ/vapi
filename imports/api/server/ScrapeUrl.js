import { Meteor } from "meteor/meteor";
import { SCRAPE } from "../classes/common/Const";
import Server from "../classes/server/Server";
import Utilities from "../classes/server/Utilities";
export default {
    [SCRAPE.SCRAPE_URL]: async function (url) {
        try {
            const markdownString = await Utilities.scrapeURL(url)
            await Server.Vapi.updateAssistantFile(markdownString)
            return;
        } catch (error) {
            console.log(error);
            throw new Meteor.Error(error)
        }
    }
}