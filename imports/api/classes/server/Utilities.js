import { parsePhoneNumber } from "awesome-phonenumber";
import { spawn } from "child_process";
import Path from "./Path";
import path from "path";
class Utilities {
    constructor() { }
    isValidString(str) {
        return (str && typeof str == "string" && str.trim());
    }
    formatArgs(arg) {
        let keys = Object.keys(arg);
        keys.splice(0, 1);
        let retval = keys.map((index) => {
            if (typeof arg[index] === "number") return `${arg[index]}`.blue;
            else if (typeof arg[index] != "string") return arg[index] ? JSON.stringify(arg[index]).magenta : arg[index];
            return `${arg[index]}`.grey;
        });
        if (!retval.length) return "";
        return retval;
    }
    log() {
        if (console) {
            console.log.apply(console, arguments);
        }
    }
    showNotice() {
        Util.log.apply(this, [`${"[Notice]: ".white}${arguments[0]}`].concat(Util.formatArgs(arguments)));
    }
    showStatus() {
        Util.log.apply(this, [`${"[Status]".green}${":".white} ${arguments[0]}`].concat(Util.formatArgs(arguments)));
    }
    showError() {
        Util.log.apply(this, [`${"[Error]".red}${":".white} ${arguments[0]}`].concat(Util.formatArgs(arguments)));
    }
    showWarning() {
        Util.log.apply(this, [`${"[Warning]".yellow}${":".white} ${arguments[0]}`].concat(Util.formatArgs(arguments)));
    }
    showDebug() {
        Util.log.apply(this, [`${"[Debug]".magenta}${":".white} ${arguments[0]}`].concat(Util.formatArgs(arguments)));
    }
    numberValidator(input, regionCode = "US") {
        if (!input) return { isValid: false };
        const phone = parsePhoneNumber(input, { regionCode });
        if (phone.valid) {
            let isUS = false;
            switch (phone.regionCode) {
                case "US": case "CA":
                case "AG": case "AI": case "AS": case "BB": case "BM": case "BS":
                case "DM": case "DO": case "GD": case "GU": case "JM": case "KN":
                case "KY": case "LC": case "MP": case "MS": case "PR": case "SX":
                case "TC": case "TT": case "VC": case "VG": case "VI": case "UM":
                    isUS = true;
                    break;
            }
            return {
                isValid: phone.valid,
                type: phone.type,
                fromUS: isUS,
                region: phone.regionCode,
                internationalFormat: phone.number.international,
                nationalFormat: phone.number.national,
                e164Format: phone.number.e164,
                rfc3966Format: phone.number.rfc3966,
                significant: phone.number.significant,
                number: input,
                country: phone.countryCode
            };
        }
        return { isValid: false };
    }
    generateBearerToken(username, password) {
        return Buffer.from(`${username}:${password}`).toString("base64");
    }
    getLast4Digits(str) {
        return str.substring(str.length - 4, str.length);
    };
    scrapeURL(url) {
        return new Promise((resolve, reject) => {
            const python = path.join(Path.BASE, ".trafilatura/venv/bin/python3");
            const scraper = path.join(Path.BASE, ".trafilatura/scrape.py");
            const scrape = spawn(python, [scraper, url])
            let markdownString = ''
            scrape.stdout.on('data', (data) => {
                markdownString = markdownString + data.toString()
            })

            scrape.stderr.on('data', (err) => {
                console.log("Error in trifalatura", err.toString())
                reject();
            })

            scrape.stdout.on('close', Meteor.bindEnvironment(() => {
                resolve(markdownString);
            }))
        })
    }
    getDomainFromUrl(url) {
        let domain = url.replace(/(^\w+:|^)\/\//, '');
        domain = domain.split('/')[0];
        domain = domain.split(':')[0];
        return domain;
    }
    getBaseUrl(urlString) {
        const url = new URL(urlString);
        const baseUrl = `${url.hostname}`;
        return baseUrl;
    }

}

export default Util = new Utilities();