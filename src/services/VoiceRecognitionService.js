// Filename: VoiceRecognitionService.js
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceRecognitionService = {
    recognition: null,

    init(callback) {
        if (!SpeechRecognition) {
            console.error('Speech recognition is not supported in this browser.');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US'; // Set language to English (United States)


        this.recognition.onresult = (event) => {
            const lastResult = event.results[event.results.length - 1];
            if (lastResult.isFinal) {
                const speechToText = lastResult[0].transcript.trim().toLowerCase();
                callback(speechToText);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
        };
    },

    start() {
        if (this.recognition) {
            this.recognition.start();
        }
    },

    stop() {
        if (this.recognition) {
            this.recognition.abort();
        }
    }
};

export default VoiceRecognitionService;