import { Meteor } from "meteor/meteor";

import Server from "../../api/classes/server/Server";
import "../../api/server";
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
    Server.registerFunctions();
    Server.startup(banner);
});