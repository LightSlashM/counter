// Filename: CounterFraction.js
import React from 'react';
import './CounterFraction.css';

const CounterFraction = ({ numerator, denominator }) => {
    // Render only if numerator is present, assuming denominator to be non-zero
    if (numerator) {
        return (
            <div className="counter-fraction">
                <span className="fraction-numerator">{numerator}</span>
                <span className="fraction-denominator">{denominator}</span>
            </div>
        );
    }

    return null;
};

export default CounterFraction;