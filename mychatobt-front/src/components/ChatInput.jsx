
// src/components/ChatInput.jsx
import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex px-2 py-2 rounded-full bg-gray-600 hover:border-gray-300">
      <input
        type="text"
        className="flex-grow rounded-2xl p-1 bg-gray-600 text-white hover:border-gray-300 outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-gray-700 text-white rounded-3xl p-2 hover:bg-gray-900"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
