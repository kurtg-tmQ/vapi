import requestF from "request";
const { default: Utilities } = require('../Utilities');




export default class OpenAi {
    #apikey;
    constructor(apikey) {
        this.#apikey = apikey;
    }
    requestPromise(options) {
        return new Promise((resolve, reject) => {
            requestF(options, (err, resp, body) => {
                if (err) reject(err);
                else resolve(body);
            });
        });
    }
    /**
     * Generate knowledge base output for VAPI using scrape text from website
     * @param {*} scrapeText 
     * @returns 
     */

    async GenerateKNowledgeBase(scrapeText) {

        try {
            const prompt = `You are an LLM expert. take the content of this file and generate a comprehensive "knowledge base" which can be used to feed into GPT4o in order to generate answers to question regarding the content of the file.
        
        ${scrapeText}`;

            const options = {
                url: 'https://api.openai.com/v1/chat/completions',
                method: 'POST',
                headers: { Authorization: `Bearer ${this.#apikey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.1
                },)
            };
            let response = await this.requestPromise(options);
            response = JSON.parse(response);
            return response.choices[0].message.content;
        } catch (error) {
            Utilities.showError('Error making OpenAI generating knowledgebase:', error.response ? error.response.data : error.message);
            throw error;
        }
    }


    async GenerateTitle(knowledggeBase) {
        try {
            const prompt = `Your are an expoert LLM. Generate a title that is relevant for the content that is relevent to the text i provided below. The title should be 50 characters or less.
        
        "${knowledggeBase}"`;


            const options = {
                url: 'https://api.openai.com/v1/chat/completions',
                method: 'POST',
                headers: { Authorization: `Bearer ${this.#apikey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.1
                },)
            };
            let response = await this.requestPromise(options);
            response = JSON.parse(response)
            return response.choices[0].message.content;
        } catch (error) {
            Utilities.showError('Error making OpenAI generating a title :', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

