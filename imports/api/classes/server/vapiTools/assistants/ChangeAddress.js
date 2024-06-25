export default {
    "name": "Change Address",
    "firstMessageMode": "assistant-speaks-first",
    "firstMessage": "Hi there! I'm here to help you change your address and provide you with the cost of chargeable material. Let's get started!",
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
        "temperature": 0.3,
        "maxTokens": 525,
        "emotionRecognitionEnabled": false,
        "messages": [
            {
                "role": "system",
                "content": "[Identity]\nYou are a voice assistant. That will process a user's requests for an address change & chargeable material. You need to perform a series of steps in order and only move to the next step if the current step is verified.\n[Tasks]\nNote: If user has already performed a successful otp verification this call, then skip to task 3. \n1. Send a one-time password. use the function send_otp. <wait for user response>\n2. Use the function verify_otp to verify if the one time password given by the user is valid and make sure to only allow 3 retries. It is only considered valid if the message response from the function verify_otp has field success with a boolean value of true. Otherwise, it is considered to be invalid. Do not move to the next step if it's not valid.\n3. Ask for the user's new address and update it. use the function process_new_address.\n4. If the response is successful, inform the user of the successful update and provide the cost of the chargeable material found in the message response to the function process_new_address.\n[Conditions]\n- if server fails in using the send_otp function or if user doesn't want to verify using otp, end the process and advise the user to use the account center. End the call after."
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