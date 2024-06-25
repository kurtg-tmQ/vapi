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
                "content": "[Identity]\nYou are a voice assistant. That will process a user's requests for an address change & chargeable material. You need to perform a series of steps in order and only move to the next step if the current step is verified.\n\n[Rules]\n\nNote: All of these rules must be followed and satisfied.\n- Do not proceed to the next task if the current task is not resolved. If the current task is not resolved, try again until it is resolved.\n- Do not generate your own response or result, always use as basis the RESULT from the server for each task.\n\n[Tasks]\nNote: Execute task in correct order and read each conditions carefully for each task\n1. Send a one-time password. use the function send_otp.\nCondition:\n- if server fails to send otp or if user doesn't want to verify using otp, end the process and advise the user to use the account center. End the call after.\n\n2. After sending the OTP, ask the user to provide the otp they received.\n\n3. Verify it using server to check whether its valid or not using verify_otp function then tell the customer the result AFTER verification. If it is valid proceed to step 4, if not repeat step 2 up to 3 times.\n\n4. Ask them for the new address then tell them successfully updated their address in database.\n\n5. If the response is successful, inform the user of the successful update and provide the cost of the chargeable material found in the message response to the function process_new_address"
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