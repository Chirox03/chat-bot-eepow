import React, { useState, useEffect } from "react";
import Conversation from "./Conversation/Conversation";
import ChatInput from "./ChatInput";
import Sidebar from "./SideBar/SideBar.js";
import useAuth from "../../AuthContext";

const ChatPage = () => {
  const { currentUser, login, logout } = useAuth();
  const [conversations, setConversations] = useState([]); // Initialize as an empty array
  const [activeConversation, setActiveConversation] = useState(null); // Initialize as null or a default value

  useEffect(() => {
    // Fetch conversations when the component mounts or when the user changes
    console.log(currentUser);
    fetchConversations();
  }, [currentUser]);

  const fetchConversations = async () => {
    try {
      // Make an API request to get conversations for the current user
      if (currentUser && currentUser.userID) {
      const response = await fetch(`http://localhost:3001/get-conversations/udWlMJuTAdkq4l2SWcAK`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log(data)
      // Update state with the fetched conversations
      setConversations(data.conversations);

      // Set the active conversation to the first conversation (you can adjust this logic)
      if (data.conversations && data.conversations.length > 0) {
        setActiveConversation(data.conversations[0]);
      }}
    } catch (error) {
      console.log("Error fetching conversations:", error);
    }
  };

  console.log("activeConversation:", activeConversation);

  const updateMessage = (message, sender) => {
    console.log("message:", message);
    // Implement your message update logic
  };

  const handleConversationClick = (conversationId) => {
    const selectedConversation = conversations.find((conversation) => conversation.id === conversationId);
    setActiveConversation(selectedConversation);
    console.log("Conversation clicked: ", conversationId);
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
        <ChatInput updateMessage={updateMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
