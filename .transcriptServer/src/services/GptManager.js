import { EventEmitter } from "events";
import OpenAI from "openai";
import dotenv from 'dotenv';
import path from "path";
import fs from "fs";
import "colors";
dotenv.config();

import * as assistants from "../assistants/registry.js";
import * as functions from "../functions/registry.js";
import Logger from "../helpers/Logger.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEFAULT_GPT_ID = process.env.DEFAULT_GPT_ID;
const __dirname = path.resolve();

class GPTManager {
    #apiKey = null;
    #gptService = {};
    constructor(apiKey) {
        if (!apiKey) throw new Error('API Key is required');
        this.#apiKey = apiKey;
    }
    init() {
        Logger.showDebug("Loaded default gpt id: ", DEFAULT_GPT_ID);
        this.createGptService(DEFAULT_GPT_ID);
    }
    getInfo(id) {
        if (assistants[id]) return assistants[id];
        return { tools: [], systemContext: '', assistantContext: '', files: [], assistantName: '' };
    }
    createGptService(id) {
        if (!this.#gptService[id]) {
            const info = this.getInfo(id);
            this.#gptService[id] = new GptService(this.#apiKey, info.tools, info.systemContext, info.assistantContext, info.files, info.firstMessage);
        }
        return this.#gptService[id];
    }
    /**
     * 
     * @param {String} id 
     * @returns {GptService}
     */
    getGptService(id) {
        if (id) return this.#gptService[id];
        return this.#gptService[DEFAULT_GPT_ID];
    }
    onClose(id) {
        if (this.#gptService[id])
            delete this.#gptService[id];
        else
            delete this.#gptService[DEFAULT_GPT_ID];
    }
}

class GptService extends EventEmitter {
    #systemContext = {
        "role": "system",
        "content": ""
    };
    #assistantContext = {
        "role": "assistant",
        "content": ""
    };
    #conditions = ["You must add a \'•\' symbol every 5 to 10 words at natural pauses where your response can be split for text to speech."];
    #availableFunctions = {};
    #files = [];
    #apiKey = null;
    #assistantId = null;
    #tools = [];
    #firstMessage = '';
    #stream = null;
    constructor(apiKey, tools, systemContext, assistantContext, files, firstMessage) {
        super();
        if (!apiKey) throw new Error('API Key is required');
        this.#apiKey = apiKey;
        this.openai = new OpenAI({ apiKey });
        this.partialResponseIndex = 0;
        this.userContext = [];
        this.#tools = tools;
        this.#firstMessage = firstMessage;
        this.loadFunctions(tools);
        this.uploadFiles(files).then(() => {
            this.createAssistantContext(systemContext, assistantContext);
        });

    }
    get FirstMessage() {
        return this.#firstMessage;
    }
    async createAssistant({ name, description, instructions, tool_resources, tools, temperature, model = "gpt-4o" }) {
        try {
            const assistants = await this.openai.beta.assistants.list();
            const assistant = assistants.data.find((a) => a.name === name);
            const update = {};
            if (description) update.description = description;
            if (instructions) update.instructions = instructions;
            if (tool_resources) update.tool_resources = tool_resources;
            if (tools) update.tools = tools;
            if (temperature) update.temperature = temperature;
            if (model) update.model = model;
            if (this.#files.length) {
                if (update.tool_resources) {
                    update.tool_resources.code_interpreter = { file_ids: this.#files };
                } else {
                    update.tool_resources = { code_interpreter: { file_ids: this.#files } };
                }
            }
            if (assistant) {
                await this.openai.beta.assistants.update(assistant.id, update);
                this.#assistantId = assistant.id;
            } else {
                const assistant = await this.openai.beta.assistants.create(update);
                this.#assistantId = assistant.id;
            }
            Logger.showStatus(`Assistant ${name} created`);
        } catch (error) {
            Logger.showError("Error creating assistant: ", error.message || error);
        }
    }
    async uploadFiles(filenames = []) {
        try {
            const files = await this.openai.files.list();
            const toUpload = filenames.filter(filename => !files.data.find(file => file.filename === filename));
            for (const filename of toUpload) {
                const filepath = path.join(__dirname, "src", "files", filename);
                if (fs.existsSync(filepath)) {
                    const file = await this.openai.files.create({
                        file: fs.createReadStream(filepath),
                        purpose: "assistants",
                    });
                    this.#files.push(file.id);
                }
            }
            files.data.forEach(file => {
                if (filenames.includes(file.filename)) {
                    this.#files.push(file.id);
                }
            });
            Logger.showStatus(`Uploaded ${this.#files.length} files`);
        } catch (error) {
            Logger.showError("Error uploading files: ", error.message || error);
        }
    }
    getModule(functionName) {
        if (functions[functionName]) {
            return functions[functionName];
        }
        return null;
    }
    async loadFunctions(tools) {
        for (const tool of tools) {
            let functionName = tool.function.name;
            try {
                const func = this.getModule(functionName);
                if (func) {
                    this.#availableFunctions[functionName] = func;
                    Logger.showStatus(`Function ${functionName} loaded`);
                } else {
                    Logger.showWarning(`Function ${functionName} not found`);
                }
            } catch (error) {
                console.error(`Error loading function ${functionName}:`, error);
            }
        }
    }
    createAssistantContext(systemContext, assistantContext) {
        this.#systemContext.content = systemContext + this.#conditions.join(' ');
        if (this.#files.length) {
            this.#systemContext.attachments = this.#files.map(file => {
                return {
                    file_id: file.id,
                    tools: [{ type: "code_interpreter" }]
                };
            });
        }
        this.#assistantContext.content = assistantContext;
        this.userContext.push(this.#systemContext);
        this.userContext.push(this.#assistantContext);
    }
    // Add the callSid to the chat context in case
    // ChatGPT decides to transfer the call.
    setCallSid(callSid) {
        this.userContext.push({ 'role': 'system', 'content': `callSid: ${callSid}` });
    }

    validateFunctionArgs(args) {
        try {
            // First, try to parse the entire string
            return JSON.parse(args);
        } catch (error) {
            console.log('Warning: Invalid or duplicate function arguments returned by OpenAI:', args);

            // If parsing fails, attempt to extract and parse the first valid JSON object
            const match = args.match(/\{[^{}]*\}/);
            if (match) {
                try {
                    return JSON.parse(match[0]);
                } catch (innerError) {
                    console.error('Error parsing extracted JSON:', innerError);
                }
            }
            if (args.indexOf('{') != args.lastIndexOf('{')) {
                return JSON.parse(args.substring(args.indexOf(''), args.indexOf('}') + 1));
            }

            // If all attempts fail, return null or an empty object
            return null; // or return {};
        }
    }

    updateUserContext(name, role, text) {
        if (name !== 'user') {
            this.userContext.push({ 'role': role, 'name': name, 'content': text });
        } else {
            this.userContext.push({ 'role': role, 'content': text });
        }
    }

    async completion(text, interactionCount, role = 'user', name = 'user') {
        this.updateUserContext(name, role, text);
        const streamConfig = {
            model: 'gpt-4-1106-preview',
            messages: this.userContext,
            tools: this.#tools,
            stream: true,
        };
        if (!this.#tools.length) delete streamConfig.tools;

        // Step 1: Send user transcription to Chat GPT
        const stream = await this.openai.chat.completions.create(streamConfig);
        this.#stream = stream;

        let completeResponse = '';
        let partialResponse = '';
        let functionName = '';
        let functionArgs = '';
        let finishReason = '';

        function collectToolInformation(deltas) {
            let name = deltas.tool_calls[0]?.function?.name || '';
            if (name != '') {
                functionName = name;
            }
            let args = deltas.tool_calls[0]?.function?.arguments || '';
            if (args != '') {
                // args are streamed as JSON string so we need to concatenate all chunks
                functionArgs += args;
            }
        }

        for await (const chunk of stream) {
            let content = chunk.choices[0]?.delta?.content || '';
            let deltas = chunk.choices[0].delta;
            let createdAt = chunk.created;
            finishReason = chunk.choices[0].finish_reason;


            // Step 2: check if GPT wanted to call a function
            if (deltas.tool_calls) {
                // Step 3: Collect the tokens containing function data
                collectToolInformation(deltas);
            }

            // need to call function on behalf of Chat GPT with the arguments it parsed from the conversation
            if (finishReason === 'tool_calls') {
                // parse JSON string of args into JSON object

                const functionToCall = this.#availableFunctions[functionName];
                const validatedArgs = this.validateFunctionArgs(functionArgs);
                console.log({ functionName, validatedArgs });

                // Say a pre-configured message from the function manifest
                // before running the function.
                const toolData = tools.find(tool => tool.function.name === functionName);
                const say = toolData.function.say;

                this.emit('gptreply', {
                    partialResponseIndex: null,
                    partialResponse: say, createdAt
                }, interactionCount);

                let functionResponse = await functionToCall(validatedArgs);

                // Step 4: send the info on the function call and function response to GPT
                this.updateUserContext(functionName, 'function', functionResponse);

                // call the completion function again but pass in the function response to have OpenAI generate a new assistant response
                await this.completion(functionResponse, interactionCount, 'function', functionName);
            } else {
                // We use completeResponse for userContext
                completeResponse += content;
                // We use partialResponse to provide a chunk for TTS
                partialResponse += content;
                // Emit last partial response and add complete response to userContext
                if (content.trim().slice(-1) === '•' || finishReason === 'stop') {
                    const gptReply = {
                        partialResponseIndex: this.partialResponseIndex,
                        partialResponse, createdAt
                    };

                    this.emit('gptreply', gptReply, interactionCount);
                    this.partialResponseIndex++;
                    partialResponse = '';
                }
            }
        }
        this.userContext.push({ 'role': 'assistant', 'content': completeResponse });
        console.log(`GPT -> user context length: ${this.userContext.length}`.green);
    }
}

export default new GPTManager(OPENAI_API_KEY);