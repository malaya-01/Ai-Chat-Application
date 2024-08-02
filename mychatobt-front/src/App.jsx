// // src/App.jsx
// import React, { useState, useEffect } from 'react';
// import ChatInput from './components/ChatInput';
// import ChatHistory from './components/ChatHistory';
// import './App.css';

// const App = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     // Fetch chat history from the backend
//     fetch('http://127.0.0.1:8000/history')
//       .then(response => response.json())
//       .then(data => setHistory(data))
//       .catch(error => console.error('Error fetching chat history:', error));
//   }, []);

//   const handleSend = (message) => {
//     fetch('http://127.0.0.1:8000/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ prompt: message }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       setHistory([...history, { user_input: message, model_response: data.response }]);
//     })
//     .catch(error => console.error('Error sending message:', error));
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <ChatHistory history={history} />
//       <ChatInput onSend={handleSend} />
//     </div>
//   );
// };

// export default App;

// src/App.jsx
import React, { useState, useEffect } from "react";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import "./App.css";

const App = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.error("Error fetching chat history:", error));
  }, []);

  const handleSend = (message) => {
    fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHistory([
          ...history,
          { user_input: message, model_response: data.response },
        ]);
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-slate-300 to-gray-300">
      <div className="w-4/6">
        <ChatHistory history={history} />
        <div className="m-5 sticky bottom-3">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default App;
