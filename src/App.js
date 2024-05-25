// Filename: App.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Counter from './components/Counter';
import CounterFraction from './components/CounterFraction';
import MicrophoneButton from './components/MicrophoneButton';
import ModeToggle from './components/ModeToggle';
import VoiceRecognitionService from './services/VoiceRecognitionService';
import { parseSpokenNumbers, speechToFraction } from './utils/Utility';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    //const [numerator, setNumerator] = useState(null);
    //const [denominator, setDenominator] = useState(null);
    const [listening, setListening] = useState(false);
    const [mode, setMode] = useState('incremental'); // 'incremental' or 'update'
    const [fraction, setFraction] = useState({ numerator: 0, denominator: 1 }); // New state for the fraction
    const countRef = useRef(count);

    const [receivedSpeech, setReceivedSpeech] = useState('');

    // deperecated logging
    /*
    const [logs, setLogs] = useState([]); // New state hook for logs
    const addLog = useCallback((message) => {
        setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
    }, []);
    */

    useEffect(() => {
        countRef.current = count;
    }, [count]);

    const updateCounterBasedOnSpeech = useCallback((speechText) => {
        // addLog(`Speech received: ${speechText}`); //new log
        setReceivedSpeech(speechText); // Set the receivedSpeech state to the latest speech text
        const number = parseSpokenNumbers(speechText);
        
        if (number !== null) {
            let newCount;
            if (mode === 'incremental') {
                newCount = countRef.current + number;
                
                setCount(prevCount => prevCount + number);
                // addLog(`New Count: ${newCount}`); //new log
                if (number % 1 === 0) { // It's a whole number
                    // setFraction({ numerator: 0, denominator: 1 }); // Reset fraction when a whole number is spoken
                } else {
                    // addLog(`Fraction`); //new log
                    const { numerator: num, denominator: denom } = speechToFraction(speechText);
                    // addLog(`Fraction detected - Numerator: ${num}, Denominator: ${denom}`); // Log the fraction result //newwww
                    setFraction({ numerator: num, denominator: denom });
                }

            } else if (mode === 'update') {
                newCount = number;
                setCount(number);
                if (number % 1 === 0) { // It's a whole number
                    setFraction({ numerator: 0, denominator: 1 }); // Reset fraction when a whole number is spoken
                } else {
                    const remainder = number % 1
                    if (remainder === 0.5) {
                        setFraction({ numerator: 1, denominator: 2 });
                    } else if (remainder === 0.25) {
                        setFraction({ numerator: 1, denominator: 4 });
                    } 
                }
            }

            if (newCount % 1 === 0) {
                setFraction({ numerator: 0, denominator: 1 });
            }
            /*

            if (number % 1 === 0) { // It's a whole number
                if (mode === 'incremental') {
                    setCount(prevCount => prevCount + number);
                } else if (mode === 'update') {
                    setCount(number);
                }
                setFraction({ numerator: 0, denominator: 1 }); // Reset fraction when a whole number is spoken
            } else { // It's a fractional number
                
                const { numerator: num, denominator: denom } = speechToFraction(speechText); // This will be a new utility function
                addLog(`Fraction detected - Numerator: ${num}, Denominator: ${denom}`); // Log the fraction result //newwww

                setFraction({ numerator: num, denominator: denom });
                if (mode === 'incremental') {
                    setCount(prevCount => prevCount + number);
                    
                } else if (mode === 'update') {
                    setCount(Math.floor(number)); // Set the count to the whole number part if in 'update' mode
                }
                
            } */
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

    const halfIncrease = () => {
        let newCount;
        newCount = count + (1 / 2);
        setCount(count + (1 / 2));
        if (newCount % 1 === 0.5) {
            setFraction({ numerator: 1, denominator: 2 });
        } else {
            setFraction({ numerator: 0, denominator: 1 });
        }
        
    };

    const thirdIncrease = () => {

        setCount(count + (1 / 3));

        let newCount;
        newCount = count + (1 / 3);
        if (newCount % 1 === (1 / 3)) {
            setFraction({ numerator: 1, denominator: 3 });
        } else if (newCount % 1 === (2 / 3)) {
            setFraction({ numerator: 2, denominator: 3 });
        } else {
            setFraction({ numerator: 0, denominator: 1 });
        }
    };

    const quarterIncrease = () => {
        setCount(count + (1 / 4));

        let newCount;
        newCount = count + (1 / 4);
        
        if (newCount % 1 === (1 / 4)) {
            setFraction({ numerator: 1, denominator: 4 });
        } else if (newCount % 1 === (2 / 4)) {
            setFraction({ numerator: 2, denominator: 4 });
        } else if (newCount % 1 === (3 / 4)) {
            setFraction({ numerator: 3, denominator: 4 });
        } else {
            setFraction({ numerator: 0, denominator: 1 });
        }
    };



    return (
        <div className="App">
            <header className="App-header">
                <div className="counter-container">
                    <div className="counter-wrapper">
                        <Counter count={Math.floor(count)} />
                    </div>
                    <CounterFraction numerator={fraction.numerator} denominator={fraction.denominator} />
                </div>

                <div className="controls">
                    <button onClick={decrement} className="control-button">-</button>
                    <button onClick={reset} className="control-button">Reset</button>
                    <button onClick={increment} className="control-button">+</button>
                </div>
                <div>
                    <MicrophoneButton listening={listening} onClick={toggleListening} />
                </div>
                <ModeToggle mode={mode} onToggle={toggleMode} />
                
            </header>
            <header>

            </header>
            <div className="part-controls">
                <button onClick={halfIncrease} className="part-control-button">1/2</button>
                <button onClick={thirdIncrease} className="part-control-button">1/3</button>
                <button onClick={quarterIncrease} className="part-control-button">1/4</button>
            </div>
            <input
                type="text"
                value={receivedSpeech}
                readOnly={true}
                className="speech-textbox"
            />
        </div>
    );
}

export default App;

// <textarea value={logs.join('\n')} readOnly className="log-textbox"></textarea>