import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";

import Routes from "./Routes";

Meteor.startup(() => {
    const container = document.getElementById("react-target");
    const root = createRoot(container);
    root.render(<Routes />);
});
