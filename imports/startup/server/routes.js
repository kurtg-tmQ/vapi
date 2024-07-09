import Server from "../../api/classes/server/Server";
import { Meteor } from "meteor/meteor";
import bodyParser from "body-parser";
import multer from "multer";

import Utilities from "../../api/classes/server/Utilities";
import { TwilioCall } from "../../api/classes/server/call/twilioCall";

Picker.middleware(multer().any());
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Meteor.startup(() => {
    Picker.route("/api/info", async function (params, request, response) {
        try {
            const retval = await Server.Vapi.parseRequest(request.body);
            Utilities.showDebug("Response: ", JSON.stringify(retval));
            response.writeHead(retval.statusCode, { "Content-Type": "application/json" });
            response.end(JSON.stringify(retval.message));
        } catch (error) {
            console.error(error);
            response.statusCode = 500;
            response.end("Error: " + error.message || error);
        }
    });
    Picker.route("/api/session", async function (params, request, response) {
        const session = Server.Vapi.createSession(request.body);
        session.parseSession(request.body);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end();
    });
    Picker.route("/receipt", async function (params, request, response) {
        Utilities.showDebug("Receipt: ", request.body);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end();
    });
    Picker.route("/handler/inbound/call", async function (params, request, response) {
        const To = request.body.To;
        const tw = new TwilioCall("", "", To);
        const twiml = tw.parseRequest(request.body.From);
        response.writeHead(200, { "Content-Type": "application/xml" });
        response.end(twiml);

    });
    Picker.route("/handler/callback/call", async function (params, request, response) {
        response.writeHead(200, { "Content-Type": "application/xml" });
        response.end(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Thank you for calling</Say></Response>`);
    });
});

// const startWebSocket = () => {
//     // Create a WebSocket server
//     const wss = new WebSocket.Server({ noServer: true, path: '/stream' });

//     // Handle WebSocket connections
//     wss.on('connection', (ws) => {
//         Utilities.showNotice("Client connected");
//         new MediaStream(ws);

//         // ws.on('message', (message) => {
//         //     console.log('Received message:', message);
//         //     // Process the received message (Twilio stream data)
//         // });

//         // ws.on('close', () => {
//         //     console.log('Client disconnected');
//         // });

//         // ws.on('error', (error) => {
//         //     console.error('WebSocket error:', error);
//         // });
//     });

//     // Integrate WebSocket server with Meteor's HTTP server
//     WebApp.httpServer.on('upgrade', (request, socket, head) => {
//         Utilities.showStatus("Upgrading connection to WebSocket");

//         wss.handleUpgrade(request, socket, head, (ws) => {
//             wss.emit('connection', ws, request);
//         });
//     });
// };