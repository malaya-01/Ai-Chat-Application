

// src/components/ChatInput.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-2 rounded-full bg-gray-500 opacity-80 hover:border-gray-400 border-gray-300 border-2 transition duration-200">
      <input
        type="text"
        className="flex-grow rounded-2xl p-2 bg-gray-500 opacity-80 text-white placeholder-gray-50 outline-none focus:ring-gray-500 transition duration-200"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700 transition duration-200 border-2 border-dashed focus:ring-2" 
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default ChatInput;
