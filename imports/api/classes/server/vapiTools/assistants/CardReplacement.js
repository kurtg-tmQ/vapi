export default {
    "name": "Card Replacement",
    "firstMessageMode": "assistant-speaks-first",
    "firstMessage": "Hi there! I'm here to help you process your card replacement. Let's get started!",
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
        "temperature": 0.7,
        "maxTokens": 525,
        "emotionRecognitionEnabled": false,
        "messages": [
            {
                "role": "system",
                "content": "You are a voice assistant. That will process a user's card replacement. You need to perform a series of steps in order and only move to the next step if the current step is verified.\n1. Send a one-time password. use the function send_otp. <wait for user response>\n2. Verify if the one time password given by the user is valid and make sure to only allow 3 retries. use the function verify_otp. \n3. If response is valid, process the card replacement. use the function process_card_replacement.\n4. If the response is successful, inform the user of the delivery dates from the server message response from step 4. Do not make up your own dates.\n[Conditions]\n- if server fails to send otp or if user doesn't want to verify using otp, end the process and advise the user to use the account center. End the call after.\n- if OTP retries reached maximum of 3 retries help the caller by providing the last 2 digits of the otp. Get the last two (2) digits of the OTP from the server. It would return either the last 2 digits of the OTP or \"expired\"."
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