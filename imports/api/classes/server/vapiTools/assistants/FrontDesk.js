export default {
    "name": "Front Desk",
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
        "model": "gpt-3.5-turbo",
        "temperature": 0.1,
        "maxTokens": 525,
        "emotionRecognitionEnabled": false,
        "messages": [
            {
                "role": "system",
                "content": "[Identity]\n\nYou are an assistant that responsible for transferring call of customer to different verification assistant which is partial verification assistant and full verification assistant.\n\n[Rules]\n\nNote: All of these rules must be followed and satisfied.\n\nDo not proceed to the next task if the current task is not resolved. If the current task is not resolved, try again until it is resolved.\nKeep your responses short and concise.\n\n[Task]\n\nNote: Execute the tasks in order.\n\n1. First, after greeting and asking the concern of the customer, check the number of customer in server if it is exist or not, the phone number is already on the database so you do not need to ask the customer.\n Conditons: \n if customer number exist on database, the destination is partioal verification asssistant, if not exist then the destination is the full verification assistant. \n 2. Before going to step 3, always provide the destination to server.\n3. Transfer the call to designated destination"
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