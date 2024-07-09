import "colors";

function log() {
    if (console) {
        console.log.apply(console, arguments);
    }
}
function formatArgs(arg) {
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
function showNotice() {
    log.apply(this, [`${"[Notice]: ".white}${arguments[0]}`].concat(formatArgs(arguments)));
}
function showStatus() {
    log.apply(this, [`${"[Status]".green}${":".white} ${arguments[0]}`].concat(formatArgs(arguments)));
}
function showError() {
    log.apply(this, [`${"[Error]".red}${":".white} ${arguments[0]}`].concat(formatArgs(arguments)));
}
function showWarning() {
    log.apply(this, [`${"[Warning]".yellow}${":".white} ${arguments[0]}`].concat(formatArgs(arguments)));
}
function showDebug() {
    log.apply(this, [`${"[Debug]".magenta}${":".white} ${arguments[0]}`].concat(formatArgs(arguments)));
}




export default {
    showNotice,
    showStatus,
    showError,
    showWarning,
    showDebug,
};