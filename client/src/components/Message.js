import React from 'react';
import './App.css';

const Message = ({ text }) => {
    return (
        <div className="message-container">
            <div className="scrolling-message">{text}</div>
        </div>
    );
};

export default Message;