// Filename: Counter.js
import React from 'react';
import './Counter.css';

const Counter = ({ count }) => {
    return (
        <div className="counter">
            <h1 className="counter-display">{count}</h1>
            {/* Fraction display should be handled here if needed */}
        </div>
    );
};

export default Counter;