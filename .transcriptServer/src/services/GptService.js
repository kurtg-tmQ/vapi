import { EventEmitter } from "events";
import OpenAI from "openai";
import dotenv from 'dotenv';
import path from "path";
import "colors";
dotenv.config();

import { tools } from "../functions/index.js";
import Logger from "../helpers/Logger.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const __dirname = path.resolve();
const availableFunctions = {};

async function loadFunctions(tools) {
    for (const tool of tools) {
        let functionName = tool.function.name;
        const modulePath = path.join(__dirname, "src", 'functions', `${functionName}.js`);

        try {
            const module = await import(modulePath);
            availableFunctions[functionName] = module.default || module;
            Logger.showStatus(`Function ${functionName} loaded`);
        } catch (error) {
            Logger.showError(`Error loading function ${functionName}: ${error.message}`);
        }
    }
}

class GptService extends EventEmitter {
    constructor(apiKey) {
        super();
        this.openai = new OpenAI({ apiKey });
        this.userContext = [
            { 'role': 'system', 'content': 'You are an outbound sales representative selling Apple Airpods. You have a youthful and cheery personality. Keep your responses as brief as possible but make every attempt to keep the caller on the phone without being rude. Don\'t ask more than 1 question at a time. Don\'t make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous. Speak out all prices to include the currency. Please help them decide between the airpods, airpods pro and airpods max by asking questions like \'Do you prefer headphones that go in your ear or over the ear?\'. If they are trying to choose between the airpods and airpods pro try asking them if they need noise canceling. Once you know which model they would like ask them how many they would like to purchase and try to get them to place an order. You must add a \'•\' symbol every 5 to 10 words at natural pauses where your response can be split for text to speech.' },
            { 'role': 'assistant', 'content': 'Hello! I understand you\'re looking for a pair of AirPods, is that correct?' },
        ],
            this.partialResponseIndex = 0;
        loadFunctions(tools);
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
            Logger.showWarning('Warning: Invalid or duplicate function arguments returned by OpenAI:', args);

            // If parsing fails, attempt to extract and parse the first valid JSON object
            const match = args.match(/\{[^{}]*\}/);
            if (match) {
                try {
                    return JSON.parse(match[0]);
                } catch (innerError) {
                    Logger.showError('Error parsing extracted JSON:', innerError);
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

        // Step 1: Send user transcription to Chat GPT
        const stream = await this.openai.chat.completions.create({
            model: 'gpt-4-1106-preview',
            messages: this.userContext,
            tools: tools,
            stream: true,
        });

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
            finishReason = chunk.choices[0].finish_reason;

            // Step 2: check if GPT wanted to call a function
            if (deltas.tool_calls) {
                // Step 3: Collect the tokens containing function data
                collectToolInformation(deltas);
            }

            // need to call function on behalf of Chat GPT with the arguments it parsed from the conversation
            if (finishReason === 'tool_calls') {
                // parse JSON string of args into JSON object

                const functionToCall = availableFunctions[functionName];
                const validatedArgs = this.validateFunctionArgs(functionArgs);

                // Say a pre-configured message from the function manifest
                // before running the function.
                const toolData = tools.find(tool => tool.function.name === functionName);
                const say = toolData.function.say;

                this.emit('gptreply', {
                    partialResponseIndex: null,
                    partialResponse: say
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
                        partialResponse
                    };

                    this.emit('gptreply', gptReply, interactionCount);
                    this.partialResponseIndex++;
                    partialResponse = '';
                }
            }
        }
        this.userContext.push({ 'role': 'assistant', 'content': completeResponse });
        Logger.showDebug('GPT -> user context length:', this.userContext.length);
    }
}

export default new GptService(OPENAI_API_KEY);