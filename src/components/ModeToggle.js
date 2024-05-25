// Filename: ModeToggle.js
import React from 'react';
import './ModeToggle.css';

const ModeToggle = ({ mode, onToggle }) => {
    const buttonText = mode === 'incremental' ? 'Incremental Mode' : 'Update Mode';

    return (
        <button className="mode-toggle" onClick={onToggle}>
            {buttonText}
        </button>
    );
};

export default ModeToggle;