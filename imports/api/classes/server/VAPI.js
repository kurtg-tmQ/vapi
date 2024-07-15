import requestF from "request";
import jwt from "jsonwebtoken";

import { SESSION_KEY, SESSION_EVENTS } from "../common/Const";
import VapiTools from "./vapiTools/registry";
import RedisVent from "./RedisVent";
import Utilities from "./Utilities";
import EventEmitter from "events";
import DB, { KnowledgeBase } from "../../DB";
import Server from "./Server";
import FormData from "form-data";
import { HTTP } from "meteor/http";
import registry from "./vapiTools/registry";
import moment from "moment";
import pool from "./poolOfNumbers/pool";


export class Vapi {
    #token;
    #tools = {};
    #sessions = {};
    #host;
    #event = new EventEmitter();
    #assistants = {};
    #pool;
    #phoneId;
    constructor(orgId, key, host, phoneId) {
        this.#token = this.generateToken(orgId, key);
        this.#host = host;
        this.#phoneId = phoneId;
        this.#pool = pool;
        this.listen();
        this.init();
    }
    get Bearer() {
        return `Bearer ${this.#token}`;
    }
    get Event() {
        return this.#event;
    }
    get SessionsIds() {
        return Object.keys(this.#sessions);
    }
    async init() {
        try {
            this.#pool.init();
            for (const vt of VapiTools) {
                const config = vt.assistant;
                config.serverUrl = this.#host + "/api/session";
                config.serverMessages = [
                    "end-of-call-report",
                    "function-call",
                    "transcript",
                    "status-update",
                    "tool-calls",
                    "transfer-destination-request",
                    "phone-call-control",
                ];
                const tools = vt.tools;
                const newConfig = await this.createTools(config, tools);
                await this.createAssistant(newConfig);
            }
            // const squads = await this.listSquad();
            // const response = await this.deleteSquad(squads[0].id);
            // console.log("Squad deleted! response: ", response);

            //Disable creating squad for a phone number
            // const response = await this.createSquad();
            // Utilities.showDebug("Squad created! response: %s", JSON.stringify(response));
            // const updatePhone = await this.updatePhonenumber(this.#phoneId, response.id);
            // Utilities.showDebug("Phone number updated! response: %s", JSON.stringify(updatePhone));
        } catch (error) {
            Utilities.showError("Error initializing VAPI! err: %s", error.message || error);
        }
    }
    /**
     * @param {String} eventName 
     * @param {Function} callback 
     */
    on(eventName, callback) {
        if (typeof callback !== "function") throw new Error("Callback must be a function");
        switch (eventName) {
            case SESSION_EVENTS.START:
            case SESSION_EVENTS.END:
            case SESSION_EVENTS.ERROR:
                if (this.#event.listenerCount(eventName) < 1)
                    this.#event.on(eventName, callback);
                break;
            default:
                throw new Error("Invalid event");
        }
    }
    listen() {
        this.on(SESSION_EVENTS.START, (sessionId) => {
            const session = this.getSession(sessionId);
            if (session) session.onStart();
        });
        this.on(SESSION_EVENTS.END, (sessionId) => {
            delete this.#sessions[sessionId];
            Utilities.showDebug("Session ended! id: %s", sessionId);
        });
    }
    /** 
     * @param {String} id
     * @returns {import("./vapiTools/template").FuncTemplate}
    */
    getTools(id) {
        return this.#tools[id];
    }
    generateToken(orgId, key) {
        return jwt.sign({ orgId }, key, { expiresIn: "30min" });
    }
    requestPromise(options) {
        return new Promise((resolve, reject) => {
            requestF(options, (err, resp, body) => {
                if (err) reject(err);
                else resolve(body);
            });
        });
    }
    recordAssistants(assistants = []) {
        const getTools = (toolsInstances, tools) => {

            if (tools) {
                return tools.map(tool => {
                    const instance = toolsInstances.find(t => t.Id === tool.function.name);
                    if (instance) return instance;
                    return null;
                });
            } else {
                return []
            }
        };
        assistants.forEach(assistant => {
            const vt = VapiTools.find(vt => vt.assistant.name === assistant.name);
            if (vt) {
                const tools = vt.tools;
                const members = vt.members;
                this.#assistants[assistant.id] = {
                    id: assistant.id,
                    name: assistant.name,
                    message: assistant.firstMessage,
                    description: assistant.model.messages[0].content,
                    tools: getTools(tools, assistant.model.tools),
                    members
                };
            }
        });
    }
    /**
     * 
     * @returns {Promise<Array>}
     */
    async listAssistants() {
        try {
            const options = {
                url: "https://api.vapi.ai/assistant",
                method: 'GET', headers: { Authorization: this.Bearer }
            };
            const response = await this.requestPromise(options);
            const parsed = JSON.parse(response);
            if (parsed && parsed.length) {
                this.recordAssistants(parsed);
                return parsed;
            }
            return [];
        } catch (error) {
            Utilities.showError("Error listing assistants! err: %s", error.message || error);
        }
    }
    /**
     * Get list of phone numbers imported in vapi
     */
    async listPhoneNumbers() {
        try {
            const options = {
                url: "https://api.vapi.ai/phone-number",
                method: "GET", headers: { Authorization: this.Bearer }
            }
            const response = await this.requestPromise(options);
            const parsed = JSON.parse(response);
            if (parsed && parsed.length) {
                return parsed;
            }
            return null;
        } catch (error) {
            Utilities.showError("Error listing phone numbers", error)
        }
    }
    /**
     * Update Assistant configuration
     * @param {*} assistantId 
     * @param {*} config updated json configuration
     * @returns 
     */
    async updateAssistant(assistantId, config) {
        try {
            if (assistantId && config) {
                const options = {
                    url: `https://api.vapi.ai/assistant/${assistantId}`,
                    method: 'PATCH',
                    headers: { Authorization: this.Bearer, 'Content-Type': 'application/json' },
                    body: JSON.stringify(config)
                };
                const response = await this.requestPromise(options);
                Utilities.showDebug("Assistant updated! response: %s", JSON.parse(response));
                return response;
            }
            throw new Error("Missing assistantId or configuration!");
        } catch (error) {
            Utilities.showError("Error updating assistant! err: %s", error.message || error);
        }
    }
    /**
     * This function will scrape the url provided if not present in the database then update a assitant associated
     * with a phone number that pulled from the pool.
     * @param {String} url url to be scrape
     * @returns 
     */
    async updateAssistantFile(url) {
        let knowledgeBase = new KnowledgeBase();
        const baseUrl = Utilities.getBaseUrl(url);
        const existingFile = await knowledgeBase.findFile(baseUrl);
        // const availablePhone = DB.Pools.findOne({}, { sort: { updatedAt: 1 } });
        const availablePhone = this.#pool.getPhone();
        if (availablePhone) {
            try {
                let markdownString = ""
                if (existingFile && existingFile.length > 0) {
                    Utilities.showStatus("Pulling the file from database");
                    markdownString = await knowledgeBase.getFile(existingFile[0]._id);
                } else {
                    Utilities.showStatus("Scraping the site for first time");
                    markdownString = await Utilities.scrapeURL(url)
                }
                const markdownJSON = JSON.parse(markdownString);
                try {
                    if (!existingFile || existingFile.length === 0)
                        knowledgeBase.saveKnowledgeBaseFile(markdownString, baseUrl)
                } catch (error) {
                    Utilities.showError("Error uploading file", error);
                }
                const response = this.uploadFile(markdownString, baseUrl);
                const fileId = response.data.id;
                let configIndex = registry.findIndex(obj => obj.assistant.name === availablePhone.name);
                let config = registry[configIndex].assistant;
                config.model.knowledgeBase = {
                    "provider": "canonical",
                    "fileIds": [
                        fileId
                    ]
                }
                config.model.messages = [
                    {
                        "role": "system",
                        "content": `You are an assitant that provide information about ${markdownJSON.title}.`
                    }
                ]
                config.firstMessage = `Good day! Thank you for calling. I can provide information about ${markdownJSON.title}. How can I assist you today?`;
                await this.updateAssistant(availablePhone.assistantId, config);
                // DB.Pools.update({ _id: availablePhone._id }, { $set: { updatedAt: moment().valueOf() } })
                this.#pool.updateIndex();
                console.log("Updated", availablePhone.number)
                return;
            } catch (error) {
                console.log(error)
                throw new Error("Something went wrong...");
            }
        } else {
            throw new Error("Assistant are currently busy. Try again later.");
        }
    }
    /**
     * Create Assistant on vapi
     * @param {Object} config json object containing the configuration for assistant
     * @returns {Object} assitant object
     */
    async createAssistant(config) {
        try {
            if (config) {
                const list = await this.listAssistants();
                const exists = list.find(assistant => assistant.name == config.name);
                if (exists) {
                    Utilities.showDebug("Assistant already exists! name: %s", config.name);
                    return await this.updateAssistant(exists.id, config);
                }
                const options = {
                    url: "https://api.vapi.ai/assistant",
                    method: "POST",
                    headers: { Authorization: this.Bearer, "Content-Type": "application/json" },
                    body: JSON.stringify(config)
                };
                const response = await this.requestPromise(options);
                Utilities.showDebug("Assistant created! response: %s", JSON.parse(response));
                const parsed = JSON.parse(response);
                if (parsed.statusCode && parsed.statusCode !== 200) {
                    throw new Error(parsed.error);
                }
                return response;
            }
            throw new Error("Missing configuration!");
        } catch (error) {
            Utilities.showError("Error creating assistant! err: %s", error.message || error);
        }
    }
    async createTools(config, tools = []) {
        try {
            if (config) {
                for (const tool of tools) {
                    try {
                        tool.setServer({ url: this.#host + "/api/info" });
                        await tool.verify();
                        config.model.tools.push(tool.toObject());
                        this.#tools[tool.Id] = tool;
                    } catch (err) {
                        Utilities.showError("Error creating tool! name: %s,  err: %s", tool.Id, err.message || err);
                    }
                }
                return config;
            }
            throw new Error("Missing configuration!");
        } catch (error) {
            Utilities.showError("Error creating tools! err: %s", error.message || error);
            throw new Error(error.message || error);
        }
    }
    getSessionId(parsed) {
        let retval = null;
        if (parsed && parsed.message && parsed.message.call) {
            if (parsed.message.call.squadId && parsed.message.call.phoneCallProviderId) {
                retval = parsed.message.call.phoneCallProviderId;
            } else if (parsed.message.call.id) {
                retval = parsed.message.call.id;
            }
        }
        return retval;
    }
    /**
     * 
     * @param {Object} requestBody 
     * @returns {Session}
     */
    createSession(requestBody) {
        let parsed = requestBody;
        if (typeof requestBody === "string") {
            parsed = JSON.parse(requestBody);
        }
        const status = parsed.message.status;
        const sessionId = this.getSessionId(parsed);
        if (sessionId) {
            if (!this.#sessions[sessionId] && status === "in-progress")
                this.#sessions[sessionId] = new Session(parsed.message.call, this.#event, this.#assistants);
            return this.#sessions[sessionId];
        }
        return null;
    }
    async createSquad() {
        try {
            const checkExists = (members = [], list = []) => {
                for (const l of list) {
                    const m = l.members;
                    const exists = m.every((member, index) => {
                        return member.assistantId === members[index].assistantId;
                    });
                    if (exists) return true;
                }
                return false;
            };
            const messageTemplate = "Please wait a moment while i am tranferring this call...";
            const getMember = (memberName) => {
                for (const id in this.#assistants) {
                    const assistant = this.#assistants[id];
                    if (assistant.name.includes(memberName)) {
                        return assistant;
                    }
                }
                return null;
            };
            const getParent = (parentName = "Front Desk") => {
                return getMember(parentName);
            };
            const createMember = (memberInfo_) => {
                const info = { assistantId: memberInfo_.id, assistantDestinations: [] };
                if (memberInfo_.members && memberInfo_.members.length) {
                    for (const member of memberInfo_.members) {
                        const memberInfo = getMember(member.assistant.name);
                        if (!memberInfo) continue;
                        info.assistantDestinations.push({
                            type: "assistant",
                            assistantName: memberInfo.name,
                            message: messageTemplate,
                            description: memberInfo.description
                        });
                    }
                }
                if (!info.assistantDestinations.length) delete info.assistantDestinations;
                return info;
            };
            const loopThroughMembers = (members, body) => {
                for (const member of members) {
                    const memberInfo = getMember(member.assistant.name);
                    if (!memberInfo) continue;
                    const member_ = createMember(memberInfo);
                    if (body.members.find(m => m.assistantId === memberInfo.id)) continue;
                    body.members.push(member_);
                    if (memberInfo.members && memberInfo.members.length) {
                        loopThroughMembers(memberInfo.members, body);
                    }
                }
            };
            const parentInfo = getParent("Front Desk");
            const body = { members: [] };
            if (parentInfo) {
                const squadMember = createMember(parentInfo);
                body.members.push(squadMember);
                if (parentInfo.members && parentInfo.members.length) {
                    for (const member of parentInfo.members) {
                        const memberInfo = getMember(member.assistant.name);
                        if (!memberInfo) continue;
                        const member_ = createMember(memberInfo);
                        body.members.push(member_);
                        if (memberInfo.members && memberInfo.members.length) {
                            loopThroughMembers(memberInfo.members, body);
                        }
                    }
                }
            }
            // console.dir(body, { depth: null });
            const list = await this.listSquad();
            const exist = checkExists(body.members, list);
            if (exist) {
                Utilities.showDebug("Squad already exists!");
                return await this.updateSquad(list[0].id, body);
            }
            const options = {
                url: "https://api.vapi.ai/squad",
                method: 'POST',
                headers: { Authorization: this.Bearer, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            const response = await this.requestPromise(options);
            return JSON.parse(response);
        } catch (error) {
            Utilities.showError("Error creating squad! err: %s", error.message || error);
            throw new Error(error.message || error);
        }
    }
    listSquad() {
        const options = {
            url: 'https://api.vapi.ai/squad',
            method: 'GET', headers: { Authorization: this.Bearer }
        };
        return this.requestPromise(options).then(response => JSON.parse(response));
    }
    deleteSquad(id) {
        const options = {
            url: `https://api.vapi.ai/squad/${id}`,
            method: 'DELETE', headers: { Authorization: this.Bearer }
        };
        return this.requestPromise(options).then(response => JSON.parse(response));
    }
    updateSquad(id, body) {
        const options = {
            url: `https://api.vapi.ai/squad/${id}`,
            method: 'PATCH',
            headers: { Authorization: this.Bearer, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        return this.requestPromise(options).then(response => JSON.parse(response));
    }
    getAssistant(assistantId) {
        const options = {
            url: `https://api.vapi.ai/assistant/${assistantId}`,
            method: 'GET', headers: { Authorization: this.Bearer }
        };
        return this.requestPromise(options).then(response => JSON.parse(response));
    }
    updatePhonenumber(id, squadId) {
        const body = { name: "Crespa", squadId, };
        const options = {
            url: `https://api.vapi.ai/phone-number/${id}`,
            method: 'PATCH',
            headers: { Authorization: this.Bearer, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        return this.requestPromise(options).then(response => JSON.parse(response));
    }
    getCall(callId) {
        const options = {
            url: `https://api.vapi.ai/call/${callId}`,
            method: 'GET', headers: { Authorization: this.Bearer }
        };
        return this.requestPromise(options).then(response => JSON.parse(response));
    }
    /**
     * 
     * @param {*} artifact 
     * @returns {import("./vapiTools/template").FuncTemplate | null}
     */
    getToolArtifact(artifact) {
        const toolRequests = artifact.messages.filter(message => message.role === "tool_calls");
        const lastMessage = toolRequests[toolRequests.length - 1];
        if (lastMessage && lastMessage.toolCalls && lastMessage.toolCalls.length) {
            const f = lastMessage.toolCalls.find(call => call.type === "function");
            if (f) {
                return this.#tools[f.function.name];
            }
        }
        return null;
    }
    getToolCalls(toolCalls) {
        const lastMessage = toolCalls[toolCalls.length - 1];
        if (lastMessage && lastMessage.type === "function") {
            return this.#tools[lastMessage.function.name];
        }
        return null;
    }
    uploadFile(markdownString, filename) {
        const formdata = new FormData();
        formdata.append('file', Buffer.from(markdownString), {
            filename: `${filename}.txt`,
            contentType: "text/plain"
        });
        try {
            const response = HTTP.post(
                "https://api.vapi.ai/file",
                {
                    headers: {
                        Authorization: this.Bearer,
                        ...formdata.getHeaders(),
                    },
                    content: formdata.getBuffer(),
                }
            );

            return response;
        } catch (error) {
            console.error("Error:", error);

        }
    }
    /**
     * 
     * @param {*} artifact 
     * @returns {import("./vapiTools/template").FuncTemplate | null}
     */
    getTool(parsed) {
        switch (parsed.message.type) {
            case "tool-calls":
                return this.getToolCalls(parsed.message.toolCalls);
            case "function-call":
            default:
                return this.getToolArtifact(parsed.message.artifact);
        }
    }
    /**
     * 
     * @param {*} requestBody 
     * @returns {Promise<{statusCode:Number, message: Object}>}
     */
    parseRequest(requestBody) {
        return new Promise((resolve) => {
            let parsed = requestBody;
            if (typeof requestBody === "string")
                parsed = JSON.parse(requestBody);
            const sessionId = this.getSessionId(parsed);
            const session = this.getSession(sessionId);
            const tool = this.getTool(parsed);
            if (tool && session) {
                tool.parseBody(parsed);
                tool.setMeta({ sessionId, consumerNumber: session.ConsumerNumber });
                const data = session.Data;
                if (data) tool.setData(data);
                // RedisVent.Session.triggerUpsert(SESSION_KEY.SYSTEM_MESSAGE, "session", { message: tool.Meta.systemMsg });
                const update = { transcriptType: "final", role: "system", transcript: tool.SystemMessage, timestamp: parsed.message.timestamp };
                session.updateTranscript(update);
                tool.parseRequest(parsed).then((response) => {
                    if (tool.Data) session.setData(tool.Data);
                    const update = { valid: response.valid, id: tool.Id };
                    if (response.info && response.info.destination) {
                        const assistantId = Object.keys(this.#assistants).find(key => this.#assistants[key].name.includes(response.info.destination));
                        session.createCheckList(parsed, assistantId);
                    }
                    session.updateChecklist(update);
                    RedisVent.Session.triggerUpsert(SESSION_KEY.UPDATE_CHECKLIST, "session", update);
                    resolve(response);
                }).catch((error) => {
                    resolve({ statusCode: 500, message: error.message || error });
                });
            } else
                resolve({ statusCode: 400, message: "Invalid request!" });
        });
    }
    /**
     * 
     * @param {String} sessionId 
     * @returns {Session}
     */
    getSession(sessionId) {
        return this.#sessions[sessionId];
    }
}

class Session {
    #call;
    #status = "";
    #debounce = null;
    #event;
    #data = null;
    #assistants = {};
    #other = {};
    #transcript = [];
    #checklist = [];
    constructor(call, event, assistants) {
        this.#call = call;
        // this.writeStream = fs.createWriteStream(Path.ASSETS + this.SessionId + ".json");
        this.init(call);
        this.#event = event;
        this.#assistants = assistants;
    }
    get Call() {
        return this.#call;
    }
    get ConsumerNumber() {
        return this.#call?.customer?.number;
    }
    get SessionId() {
        if (this.IsSquadCall)
            return this.#call.phoneCallProviderId;
        return this.#call.id;
    }
    get Status() {
        return this.#status;
    }
    get Data() {
        return this.#data;
    }
    get IsSquadCall() {
        return !!this.#call.squadId;
    }
    get OTP() {
        return this.#other.otp;
    }
    updateChecklist(data = { id: "", valid: false }) {
        function getChecklistIdx(list = [], id) {
            let parentIdx = -1, childIdx = -1;
            parentIdx = list.findIndex((category) => {
                return !!category.items.find((item) => item.value === id);
            });
            if (parentIdx > -1)
                childIdx = list[parentIdx].items.findIndex((item) => item.value === id);
            return { parentIdx, childIdx };
        };
        const { parentIdx, childIdx } = getChecklistIdx(this.#checklist, data.id);
        if (parentIdx > -1 && childIdx > -1) {
            const newChecklist = [...this.#checklist].map((category) => ({ ...category, items: [...category.items].map((item) => ({ ...item, current: false })) }));
            if (newChecklist[parentIdx] && newChecklist[parentIdx].items[childIdx]) {
                newChecklist[parentIdx].items[childIdx] = { ...newChecklist[parentIdx].items[childIdx], current: true, completed: data.valid };
                newChecklist[parentIdx].isComplete = !!newChecklist[parentIdx].items.every((item) => item.completed);
                this.#checklist = newChecklist;
            }
        }
    }
    onStart() {
        RedisVent.Session.triggerUpsert(SESSION_KEY.UPDATE_CONVERSAION, "session", { transcript: this.#transcript, checklist: this.#checklist });
    }
    onEnd() {
        const query = { id: this.SessionId };
        if (this.IsSquadCall) {
            delete query.id;
            query.phoneCallProviderId = this.SessionId;
        }
        DB.Sessions.rawCollection().updateOne(query, { $set: { ...this.#call, status: this.#status, transcript: this.#transcript } }).then(() => {
            this.#event.emit(SESSION_EVENTS.END, this.SessionId);
        });
    }
    setData(data) {
        this.#data = data;
    }
    init(call) {
        DB.Sessions.insert(call);
    }
    updates(update, forced = false) {
        const query = { id: this.SessionId };
        if (this.IsSquadCall) {
            delete query.id;
            query.phoneCallProviderId = this.SessionId;
        }
        if (forced) {
            DB.Sessions.update(query, { $set: update });
            return;
        }
        if (this.#debounce) {
            clearTimeout(this.#debounce);
        }
        this.#debounce = setTimeout(Meteor.bindEnvironment(() => {
            DB.Sessions.update(query, { $set: update });
        }), 1000 * 3);
    }
    processConversations(conversation = []) {
        return conversation.filter((conv) => {
            return ["bot", "user"].includes(conv.role);
        });
    }
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    }
    updateTranscript({ transcriptType, role, transcript, timestamp }) {
        if (transcriptType === "final") {
            this.#transcript.push({ transcriptType, role, transcript, timestamp });
            DB.Sessions.rawCollection().updateOne({ id: this.SessionId }, { $push: { transcript: { transcriptType, role, transcript, timestamp } } });
        }
        RedisVent.Session.triggerUpsert(SESSION_KEY.UPDATE_TRANSCRIPT, "session", { transcriptType, role, transcript, timestamp });
    }
    parseSession(requestBody) {
        let parsed = requestBody;
        if (typeof requestBody === "string")
            parsed = JSON.parse(requestBody);
        const type = parsed.message.type;
        const timestamp = parsed.message.timestamp;
        this.#call = parsed.message.call;
        switch (type) {
            case "transcript": {
                this.updateTranscript({
                    transcriptType: parsed.message.transcriptType,
                    role: parsed.message.role,
                    transcript: parsed.message.transcript,
                    timestamp
                });
                break;
            }
            case "status-update":
                this.#status = parsed.message.status;
                if (this.#status === "in-progress") {
                    let assistantId = null;
                    if (this.IsSquadCall) {
                        assistantId = Object.keys(this.#assistants).find(key => this.#assistants[key].name === "Task Router");
                    }
                    this.createCheckList(parsed, assistantId);
                }
                this.updates({ status: this.#status, timestamp });
                RedisVent.Session.triggerUpsert(SESSION_KEY.UPDATE_STATUS, "session", { status: this.#status });
                break;
            case "end-of-call-report":
                const callResult = {
                    callSummary: {
                        start: parsed.message.call.createdAt,
                        end: parsed.message.timestamp,
                    },
                    callAnalytics: parsed.message.analysis
                };
                const readableSummary = `Call started at ${this.formatDate(callResult.callSummary.start)} and ended at ${this.formatDate(callResult.callSummary.end)}.`;
                const ms = new Date(callResult.callSummary.end) - new Date(callResult.callSummary.start);
                const totalSeconds = Math.floor(ms / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const duration = `${minutes} mins ${seconds} seconds`;
                const update = {
                    transcriptType: "final",
                    role: "assistant",
                    transcript: `
                        <h5>Call Info :</h5> <br>
                        <b>Summary : </b>${readableSummary}<br>
                        <b>Duration : </b> ${duration} <br> <br>


                        <h5>Call Analytics : </h5><br>
                        <b>Analysis : </b> ${callResult.callAnalytics.summary} <br>
                        <b>Success Evaluation : </b> ${callResult.callAnalytics.successEvaluation} <br></br>
                            
                    `,
                    timestamp: parsed.message.timestamp
                };
                this.updateTranscript(update);
                this.#status = "completed";
                this.onEnd();
                break;
            case "phone-call-control":
                this.#status = "hangup";
                this.onEnd();
                break;
        }
    }
    startRecording(body) {
        this.writeStream.write(JSON.stringify(body));
    }
    createCheckList(parsed, id = null) {
        let assistantId = parsed.message?.call?.assistantId;
        const isFrontDesk = (message) => {
            const type = message.type;
            if (type === "status-update" && message.status === "in-progress") {
                return true;
            }
            return false;
        };
        if (isFrontDesk(parsed.message)) {
            assistantId = Object.keys(this.#assistants).find(key => this.#assistants[key].name === "Front Desk");
        }
        if (id) assistantId = id;
        const checklist = [
            {
                name: "Introductions",
                isComplete: true,
                items: [
                    { name: "Greetings", completed: true, current: true, value: "greetings" },
                ]
            },
        ];
        const credentials = {
            name: "Credentials",
            isComplete: false,
            items: []
        };
        if (assistantId) {
            const tools = this.#assistants[assistantId].tools;
            if (tools && tools.length) {
                tools.forEach(tool => {
                    const title = tool.Meta.title;
                    credentials.items.push({ name: title, completed: false, current: false, value: tool.Id });
                });
            }
            checklist.push(credentials);
        }
        this.#checklist = checklist;
        Meteor.defer(() => {
            RedisVent.Session.triggerUpsert(SESSION_KEY.UPDATE_STATUS, "session", { status: "started", checklist });
        });
    }
}


