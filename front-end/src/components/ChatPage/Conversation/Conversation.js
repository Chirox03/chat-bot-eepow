// Conversation.js
import React from "react";
import Message from "./Message";
const Conversation = ({activeConversation}) => {
  console.log("Conversation",activeConversation)
  return (
    <div className="Conversation">
        <div className=" relative w-full p-5 m-0 overflow-scroll bg-light space-y-2">
            {/* Conversation items */}
            {/* Replace the placeholder content below with your conversation items */}
            {activeConversation && activeConversation.data
              ? activeConversation.data.map((item, index) => (
                <div key={index} className="p-3 rounded-lg col-start-1 col-end-13">
                    <Message message={item} />  
                  </div>
                ))
              : null}
            {/* Add more conversation items as needed */}
        </div>
    </div>
  );
};

export default Conversation;
