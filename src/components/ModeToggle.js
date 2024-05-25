// Filename: ModeToggle.js
import React from 'react';
import './ModeToggle.css';

const ModeToggle = ({ mode, onToggle }) => {
    return (
        <div className="mode-toggle">
            <input
                id="mode-switch"
                type="checkbox"
                checked={mode === 'update'}
                onChange={onToggle}
            />
            <label htmlFor="mode-switch" className="toggle-label"></label>
            <span>{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</span>
        </div>
    );
};

export default ModeToggle;