// Filename: CounterFraction.js
import React from 'react';
import './CounterFraction.css';

const CounterFraction = ({ numerator, denominator }) => {
    if (numerator > 0) { // Only render the fraction if the numerator is not zero
        return (
            <div className="counter-fraction">
                <span className="fraction-numerator">{numerator}</span>
                <div className="fraction-line"></div>
                <span className="fraction-denominator">{denominator}</span>
            </div>
        );
    }
    return null; // Don't render anything if there's no fraction
};

export default CounterFraction;