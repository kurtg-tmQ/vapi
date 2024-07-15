import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";

import Routes from "./Routes";
import { WebSocketProvider } from "../../ui/components/WebSocket";// Import the WebSocketProvider

Meteor.startup(() => {
    const container = document.getElementById("react-target");
    const root = createRoot(container);
    root.render(
        <WebSocketProvider>
            <Routes />
        </WebSocketProvider>
    );
});
