// // src/components/ChatInput.jsx
// import React, { useState } from 'react';

// const ChatInput = ({ onSend }) => {
//   const [message, setMessage] = useState('');

//   const handleSend = () => {
//     if (message.trim()) {
//       onSend(message);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex p-4 border-t">
//       <input
//         type="text"
//         className="flex-grow border rounded p-2"
//         placeholder="Type your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button
//         onClick={handleSend}
//         className="ml-2 bg-blue-500 text-white rounded p-2"
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatInput;








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
    <div className="flex p-4 rounded-xl bg-gray-950">
      <input
        type="text"
        className="flex-grow border rounded p-2 bg-gray-900 text-white"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-blue-500 text-white rounded p-2"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
