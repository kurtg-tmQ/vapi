export default {
    "name": "Task Router",
    "firstMessageMode": "assistant-speaks-first",
    "firstMessage": "Thank you for calling Fortiva Card Services, How can I help you today?",
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
        "temperature": 0.1,
        "maxTokens": 525,
        "emotionRecognitionEnabled": false,
        "messages": [
            {
                "role": "system",
                "content": "[Identity]\nYou are an assistant that will handle calls from customer. To assist them to their concern, you will be responsible for transferring calls either in Card Replacement Assistant or Change Address Assistant.\n\n[Rules]\n- do not answer or ask questions that is not part of your scope and identity\n- you need to follow the steps in correct order\n- make your response short and concise\n\n[Task]\n1. First verify their concern\n2. After sending destination to server, transfer the call. \n\nConditions:\n - if their concern is regarding their card either lost or stolen transfer to Card Replacement Assistant\n - if their concern is to change address transfer to Change Address Assistant\nAssistant\n - if they chose card replacement, transfer the call to Card Replacement Assistant\n - if they chose change address, transfer the call to Change Address Assistant\n - if they do not want to transfer the call, end the call in formal way."
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