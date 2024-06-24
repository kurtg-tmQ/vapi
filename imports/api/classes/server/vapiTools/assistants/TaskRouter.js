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
        "model": "gpt-3.5-turbo",
        "temperature": 0.7,
        "maxTokens": 525,
        "emotionRecognitionEnabled": false,
        "messages": [
            {
                "role": "system",
                "content": "[Identity]\nYou are an assistant that will handle calls from customer. You will be responsible for transferring calls either in Full Verification 5 Assistant, Card Replacement OR in Partial Verification Assistant.\n[Rules]\n- do not answer or ask questions that is not past of your scope and identity\n- you need to follow the steps in correct order\n- make your response short and concise\n[Task]\n1. Ask them if they want to transfer the call from to full verification assistant, Card Replacement or partial verification assistant.\nConditions:\n - before transferring the call to assistant, provide the destination to server \n - if they choose full verification, transfer it to Full Verification 5 Assistant\n - if they choose partial verification, transfer the call to Partial Verification Assistant\n - if they choose partial verification, transfer the call to Partial Verification Assistant\n - if they do not want to transfer the call, end the call in formal way."
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