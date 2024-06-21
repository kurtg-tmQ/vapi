import Server from "../../api/classes/server/Server";
import { Meteor } from "meteor/meteor";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";

import Path from "../../api/classes/server/Path";


Picker.middleware(multer().any());
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Meteor.startup(() => {
    Picker.route("/api/info", async function (params, request, response) {
        try {
            Server.Vapi.parseRequest(request.body).then(retval => {
                console.dir(retval.message, { depth: null });
                response.writeHead(retval.statusCode, { "Content-Type": "application/json" });
                response.end(JSON.stringify(retval.message));
            });
            // const session = Server.Vapi.createSession(request.body);
            // if (session) {
            //     session.parseRequest(request.body).then(retval => {
            //         console.dir(retval.message, { depth: null });
            //         response.writeHead(retval.statusCode, { "Content-Type": "application/json" });
            //         response.end(JSON.stringify(retval.message));
            //     });
            // } else {
            //     throw new Error("Invalid request!");
            // }
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
});