export default {
    "name": "Full Verification",
    "firstMessageMode": "assistant-speaks-first",
    "firstMessage": "Hello, this is full verification, How can I help you today?",
    "recordingEnabled": true,
    "hipaaEnabled": false,
    "silenceTimeoutSeconds": 30,
    "backchannelingEnabled": true,
    "backgroundDenoisingEnabled": true,
    "voicemailMessage": "Sorry, I am not available right now. Please leave a message after the beep.",
    "endCallMessage": "Thank you for calling. Goodbye.",
    "metadata": {},
    "serverUrl": "https://calf-true-llama.ngrok-free.app/api/session",
    "transcriber": {
        "provider": "deepgram",
        "model": "nova-2",
        "language": "en-US",
        "smartFormat": true,
        "keywords": []
    },
    "model": {
        "provider": "openai",
        "model": "gpt-4o",
        "temperature": 0.0,
        "maxTokens": 525,
        "emotionRecognitionEnabled": false,
        "messages": [
            {
                "role": "system",
                "content": "[Identity]\nYou are a call assistant responsible for answering calls to update and manage customer data.\n\n[Rules]\nNote: All of these rules must be followed and satisfied.\n1. Do not proceed to the next task if the current task is not resolved. If the current task is not resolved, try again until it is resolved. Not resolved mean the server response like not exist, not valid , incorrect or other related response.\n2. Before continuing to the task you should always spell back to the customer the input you received from them to confirm it. For example, if the customer says \"My name is Mark Vincent,\" respond with \"I will just confirm it, your name spells like 'M' 'A' 'R' 'K' 'V' 'I' 'N' 'C' 'E' 'N' 'T'.\" Apply this to all important details received from the customer. Wait until they confirm it.\n3. Do not generate your own response or result, always use as basis the RESULT from the server for each task.\n4. Keep your responses short and concise.\n\n[Task]\nNote: Execute the tasks in order.\n1. Ask for the customer's first name and last name, then use the server to check if they already exist in the database.\n2. If the customer exists, ask for their zip code and validate it.\n3. Ask for the last four digits of their security number, then check with the server if it is correct or incorrect.\n4. Ask for their birthday in the format of month, day, and year and validate it.\n5. Ask the customer to provide the last four digits of their card/account number, then check with the server if the card number exists and requires a password.\n6. If the response requires a password, ask for it and verify it, then wait to see if it is verified or not verified. If not requiring a password, just go to next step.\n7. If all tasks are resolved, end the call formally."
            }
        ],
        "tools": []
    },
    "voice": {
        "inputPreprocessingEnabled": true,
        "inputReformattingEnabled": true,
        "inputMinCharacters": 30,
        "inputPunctuationBoundaries": [
            "。",
            "，",
            ".",
            "!",
            "?",
            ";",
            ")",
            "،",
            "۔",
            "।",
            "॥",
            "|",
            "||",
            ",",
            ":"
        ],
        "fillerInjectionEnabled": true,
        "provider": "azure",
        "voiceId": "andrew"
    },
    "responseDelaySeconds": 2,
    "serverMessages": [
        "conversation-update",
        "end-of-call-report",
        "function-call",
        "hang",
        "model-output", "phone-call-control", "transcript",
        "speech-update",
        "status-update",
        "tool-calls",
        "transfer-destination-request",
        "user-interrupted", "voice-input"
    ],
};
