import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import Client from "../../api/classes/client/Client";

import Routes from "./Routes";

Meteor.startup(() => {
    // Client.renderCSSJS().then(() => {
    const container = document.getElementById("react-target");
    const root = createRoot(container);
    root.render(<Routes />);
    // });
});
