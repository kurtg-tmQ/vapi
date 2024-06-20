import { Meteor } from "meteor/meteor";
import fs from "fs";

import Server from "../../api/classes/server/Server";
import Path from "../../api/classes/server/Path";
import "./routes";

Meteor.startup(() => {
    const banner = `
 /$$    /$$  /$$$$$$  /$$$$$$$  /$$$$$$
| $$   | $$ /$$__  $$| $$__  $$|_  $$_/
| $$   | $$| $$  \\ $$| $$  \\ $$  | $$
|  $$ / $$/| $$$$$$$$| $$$$$$$/  | $$
 \\  $$ $$/ | $$__  $$| $$____/   | $$
  \\  $$$/  | $$  | $$| $$        | $$
   \\  $/   | $$  | $$| $$       /$$$$$$
    \\_/    |__/  |__/|__/      |______/
`;
    Server.startup(banner);
});