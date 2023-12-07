// ChatInput.js
import React from "react";
import { useState } from "react";
const ChatInput = ({updateMessage}) => {
  const [message, setMessage] = useState('');
  const handleMesseageChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value)
    console.log(message);
  }
  const handleSend = () => {
    const sender = "User";
    console.log("Input ",message);
    if(message === '') return;
    // Use the functional form of setMessage to get the latest state
    updateMessage(message, sender);
    setMessage('');
  };
  return (
    <div className="ChatInput pb-4">
      <div>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-darker focus:ring-dark pl-4 h-10"
            placeholder="Type your message..."
            value={message}
            onChange={handleMesseageChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            required
          />
        </div>
      </div>
      <div className="ml-4">
        <button onClick={handleSend}
         className="flex items-center justify-center bg-darker/70 hover:bg-darker/60 rounded-xl text-white px-4 py-2 flex-shrink-0"> 
          <span>Send</span>
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
