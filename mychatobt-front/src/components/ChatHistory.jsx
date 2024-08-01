// // src/components/ChatHistory.jsx
// import React from 'react';

// const ChatHistory = ({ history }) => {
//   return (
//     <div className="p-4 overflow-y-auto flex-grow">
//       {history.map((entry, index) => (
//         <div key={index} className="mb-4">
//           <div><strong>User:</strong> {entry.user_input}</div>
//           <div><strong>Model:</strong> {entry.model_response}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatHistory;







// src/components/ChatHistory.jsx
import React from 'react';

const ChatHistory = ({ history }) => {
  return (
    <div className="p-4 overflow-y-auto flex-grow bg-gray-900">
      {history.map((entry, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-end">
            <div className=" rounded-lg p-3 max-w-lg text-white">
              <strong>User:</strong> <br/> <div className='border rounded-2xl px-8 py-2'>{entry.user_input}</div>
            </div>
          </div>
          <div className="flex justify-start mt-2">
            <div className=" rounded-lg p-3 max-w-fit text-white">
              <strong>Model:</strong> <br/> {entry.model_response}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;