import Server from "../../api/classes/server/Server";
import { Meteor } from "meteor/meteor";
import bodyParser from "body-parser";
import multer from "multer";

import Utilities from "../../api/classes/server/Utilities";

Picker.middleware(multer().any());
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Meteor.startup(() => {
    Picker.route("/api/info", async function (params, request, response) {
        try {
            const retval = await Server.Vapi.parseRequest(request.body);
            // console.log("Response: ");
            // console.dir(retval, { depth: null });
            response.writeHead(retval.statusCode, { "Content-Type": "application/json" });
            response.end(JSON.stringify(retval.message));
        } catch (error) {
            response.statusCode = 500;
            response.end("Error: " + error);
        }
    });
    Picker.route("/api/session", async function (params, request, response) {
        // console.dir(request.body, { depth: null });
        const session = Server.Vapi.createSession(request.body);
        session.parseSession(request.body);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end();
    });
    Picker.route("/receipt", async function (params, request, response) {
        // console.dir(request.body, { depth: null });
        Utilities.showDebug("Receipt: ", request.body);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end();
    });
});