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
        info: {}
    };
    #data = null;
    #meta = {};
    constructor(async, server, messages = [], func = {}, meta = {}) {
        this.#async = async;
        this.#func = func;
        this.#server = server;
        this.#messages = messages;
        this.#meta = meta;
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
    setResponse(statusCode, message, valid = false, info = {}) {
        this.#response.statusCode = statusCode;
        this.#response.message = message;
        this.#response.valid = valid;
        this.#response.info = info;
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
            messages: this.#messages
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
            if (!result.result || typeof result.result !== "string")
                throw new Error("Missing result!");
        }
        return Promise.resolve(this.#response);
    }
    async parseRequest(request) {
        return this.checkResponse();
    }
}