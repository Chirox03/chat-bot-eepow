// Conversation.js
import React from "react";
import Message from "./Message";
import { useState, useEffect } from "react";
import axios from "axios";
const Conversation = ({activeConversation}) => {
  const fetchMessages = async (conversationID) => {
    try {
      // Make a GET request to the backend API with the conversation ID
      const response = await axios.get(`http://localhost:3001/get-messages/${conversationID}`);
  
      // Check if the request was successful
      if (response.status === 200) {
        // Extract the messages from the response data
        const messages = response.data;
  
        // Log or handle the messages as needed
        console.log("Fetched messages:", messages);
        
        // Return the messages or perform any other action
        return messages;
      } else {
        console.error("Error fetching messages:", response.status, response.data);
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      // Handle the error as needed
    }
  };
  useEffect(() => {
    console.log("Current Conversation chat", activeConversation);
    if (activeConversation && activeConversation.id) {
      // Fetch messages for the active conversation
      fetchMessages(activeConversation.id);
    }
  }, [activeConversation]);
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
