// Filename: MicrophoneButton.js
import React from 'react';
import './MicrophoneButton.css';

const MicrophoneButton = ({ listening, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`microphone-button ${listening ? 'listening' : ''}`}
        >
            {listening ? 'Stop' : 'Start'} Listening
        </button>
    );
};

export default MicrophoneButton;