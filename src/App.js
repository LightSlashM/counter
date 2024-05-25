// Filename: App.js
import React, { useState, useEffect, useCallback } from 'react';
import Counter from './components/Counter';
import CounterFraction from './components/CounterFraction';
import MicrophoneButton from './components/MicrophoneButton';
import ModeToggle from './components/ModeToggle';
import VoiceRecognitionService from './services/VoiceRecognitionService';
import { parseSpokenNumbers } from './utils/Utility';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [numerator, setNumerator] = useState(null);
    const [denominator, setDenominator] = useState(null);
    const [listening, setListening] = useState(false);
    const [mode, setMode] = useState('incremental'); // 'incremental' or 'update'

    const updateCounterBasedOnSpeech = useCallback((speechText) => {
        const number = parseSpokenNumbers(speechText);
        if (number !== null) {
            if (mode === 'incremental' && typeof number === 'number') {
                setCount(prevCount => prevCount + number);
            } else if (mode === 'update') {
                setCount(number);
            }
        }
    }, [mode]);

    useEffect(() => {
        VoiceRecognitionService.init(updateCounterBasedOnSpeech);

        // Clean up: stop recognition when component unmounts
        return () => VoiceRecognitionService.stop();
    }, [updateCounterBasedOnSpeech]);

    const toggleListening = () => {
        if (listening) {
            VoiceRecognitionService.stop();
        } else {
            VoiceRecognitionService.start();
        }
        setListening(!listening);
    };

    const toggleMode = () => {
        setMode(prevMode => prevMode === 'incremental' ? 'update' : 'incremental');
    };

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Counter count={count} />
                <CounterFraction numerator={numerator} denominator={denominator} />

                <div className="controls">
                    <button onClick={decrement} className="control-button">-</button>
                    <button onClick={reset} className="control-button">Reset</button>
                    <button onClick={increment} className="control-button">+</button>
                </div>

                <MicrophoneButton listening={listening} onClick={toggleListening} />

                <ModeToggle mode={mode} onToggle={toggleMode} />
            </header>
        </div>
    );
}

export default App;