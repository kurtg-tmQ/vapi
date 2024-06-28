export class FuncTemplate {
    #async = true;
    #type = "function";
    #func = {
        name: "",
        description: "",
        parameters: {
            type: "object",
            properties: {},
        }
    };
    #server = {
        timeoutSeconds: 10,
        url: "",
        secret: ""
    };
    #messages = [];
    #response = {
        statusCode: 200,
        message: {
            results: [
                {
                    toolCallId: "",
                    result: "",
                }
            ]
        },
        valid: false,
        info: {},
        arguments: {},
        sessionId: "",
    };
    #data = null;
    #meta = {};
    #arguments = {};
    #temp = { systemMsg: "" };
    #otherInfo = {};

    constructor(async, server, messages = [], func = {}, meta = {}, otherInfo = {}) {
        this.#async = async;
        this.#func = func;
        this.#server = server;
        this.#messages = messages;
        this.#meta = meta;
        this.#otherInfo = otherInfo;
    }
    get Id() {
        return this.#func.name;
    }
    get Response() {
        return this.#response;
    }
    get Data() {
        return this.#data;
    }
    get Meta() {
        return this.#meta;
    }
    get Arguments() {
        return this.#arguments;
    }
    get SystemMessage() {
        return this.#temp.systemMsg;
    }
    setCustomSystemMessage(message) {
        this.#temp.systemMsg = message;
    }
    parseBody(requestBody) {
        const obj = {};
        let systemMsg = this.#meta?.systemMsg?.replace(".", "") || this.Id;
        this.#temp.systemMsg = "";
        this.#temp.systemMsg = systemMsg;
        if (requestBody && requestBody.message && requestBody.message.toolCalls && requestBody.message.toolCalls.length) {
            const func = requestBody.message.toolCalls[0].function;
            if (func && func.arguments) {
                for (const [key, value] of Object.entries(func.arguments)) {
                    obj[key] = value;
                    if (this.#func.parameters.properties[key]) {
                        this.#temp.systemMsg = "";
                        this.#temp.systemMsg = systemMsg += ` - ${value}`;
                    }
                }
            }
        }
        this.#arguments = obj;
    }
    /**
     * 
     * @param {Object} meta 
     */
    setMeta(meta) {
        if (meta && typeof meta === "object")
            this.#meta = { ...this.#meta, ...meta };
    }
    setResponse(statusCode, message, valid = false, info = {}) {
        this.#response.statusCode = statusCode;
        this.#response.message = message;
        this.#response.valid = valid;
        this.#response.info = info;
        this.#response.id = this.Id;
        this.#response.arguments = this.#arguments;
        this.#response.sessionId = this.#meta.sessionId;
    }
    setServer(server) {
        if (server) {
            if (server.timeoutSeconds) this.#server.timeoutSeconds = server.timeoutSeconds;
            if (server.url) this.#server.url = server.url;
            if (server.secret) this.#server.secret = server.secret;
        }
    }
    verify() {
        if (!this.#func.name || typeof this.#func.name !== "string")
            throw new Error("Missing function name!");
        if (!this.#func.description || typeof this.#func.description !== "string")
            throw new Error("Missing function description!");
        if (!this.#func.parameters || typeof this.#func.parameters !== "object")
            throw new Error("Missing function parameters!");
        if (!this.#func.parameters.properties || typeof this.#func.parameters.properties !== "object")
            throw new Error("Missing function parameters properties!");
        if (!this.#server.url || !this.#server.url.includes("https"))
            throw new Error("Invalid server url!");
        if (!this.#messages.length)
            throw new Error("Missing messages!");
        return Promise.resolve();
    }
    toObject() {
        return {
            async: this.#async,
            type: this.#type,
            server: this.#server,
            function: this.#func,
            messages: this.#messages,
            ...this.#otherInfo
        };
    }
    setData(data) {
        this.#data = data;
    }
    checkResponse() {
        if (!this.#response.message.results.length)
            throw new Error("Missing results!");
        for (const result of this.#response.message.results) {
            if (!result.toolCallId || typeof result.toolCallId !== "string")
                throw new Error("Missing toolCallId!");
            if (!result.result)
                throw new Error("Missing result!");
        }
        return Promise.resolve(this.#response);
    }
    async parseRequest(request) {
        return this.checkResponse();
    }
}