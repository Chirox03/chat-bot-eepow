import React, { useState } from "react";
import Conversation from "./Conversation/Conversation";
import ChatInput from "./ChatInput";
import Sidebar from "./SideBar/SideBar.js";
import { User } from "../../class/User.js";
import { Conversation as conversation } from "../../class/Conversation.js";
import axios from "axios";
import { useEffect } from "react";
const ChatPage = ({user,updateUser}) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
 
  console.log();
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // //const response = await axios.post(`/api/conversations/${user.UserID}`);
        // // handle the response, e.g., update the state with the new conversation data
        // console.log("Conversations data: ", response.data);
        // setConversations(response.data);
        // Update the state or perform other actions based on the response
      } catch (error) {
        console.error("Error fetching conversation data:", error);
      }
    };
    fetchConversations();
  }, [activeConversation]);
  const updateMessage = async(message,sender) => {
    try{
      if(isProcessing){
        console.log("Only one request at a time");
        return;
      }
      setIsProcessing(true);
      const response = await axios.post("/api/addMessage", { 
        conversationId: activeConversation.id,
        message: message,
        sender: sender
      });
      setActiveConversation(response.data);
    } catch(err){
      console.error("Error updating message",err);
    }finally{
      setIsProcessing(false);
    }
  }
  const handleConversationClick = async (conversationId) => {
    try {
      const response = await axios.post(`/api/conversation/${conversationId}`);
      // handle the response, e.g., update the state with the new conversation data
      console.log("Conversation clicked: ", conversationId);
      console.log("Conversation data: ", response.data);
      setActiveConversation(response.data);
      // Update the state or perform other actions based on the response
      // setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversation data:", error);
    }
  };

  return (
    <div className="ChatPage">
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onConversationClick={handleConversationClick}
      />
      <div className="flex flex-col w-full">
        <Conversation activeConversation={activeConversation} />
        <ChatInput updateMessage={updateMessage}/>
      </div>
    </div>
  );
};

export default ChatPage;
