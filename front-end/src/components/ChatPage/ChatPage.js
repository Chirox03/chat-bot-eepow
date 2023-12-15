import React, { useState, useEffect } from "react";
import Conversation from "./Conversation/Conversation";
import { useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";
import Sidebar from "./SideBar/SideBar.js";
import useAuth from "../../AuthContext";
import { getAuth } from "firebase/auth";
import axios from "axios";
import ReactMarkdown from 'react-markdown'
const ChatPage = () => {
  const { currentUser, login, logout } = useAuth();
  const [conversations, setConversations] = useState([]); // Initialize as an empty array
  const [activeConversation, setActiveConversation] = useState(null); // Initialize as null or a default value
  const [newMessage, setNewMessage] = useState();
  const navigate = useNavigate();
  console.log(currentUser.displayName)
  useEffect(() => {
    if (currentUser === null) {
      // Navigate to "/" if user is null
      alert(currentUser)
      navigate('/');
    } else {
      console.log('User now:', currentUser);
    }
    // The empty dependency array ensures this effect runs only once when the component mounts
  }, [currentUser, navigate]);
  useEffect(() => {
    // Fetch conversations when the component mounts or when the user changes
    console.log("ssss",currentUser);
    fetchConversations();
  }, [currentUser]);
  useEffect(() => {
    async function refetch(){
      try {
        console.log("New message:",newMessage)
        // Make a PUT request to update the message
        const response = await axios.post(`http://localhost:3001/update-messages/${activeConversation.id}`, newMessage);
        
        // Check if the request was successful
        if (response.status === 200) {
          console.log('Message updated successfully:', response.data);
        }else {
          console.error('Error updating message:', response.status, response.data);
        }}catch (error) {
          console.error('Error updating message:', error.message);
          // Handle the error as needed
        }
        fetchConversations();
        setNewMessage('')
  }
  refetch();
},[newMessage])
  const updateMessage = async (message, sender) => {
    console.log("message:", message);
    console.log("sender:", sender);
    const newMessage_={
      message:{     
        From: sender,
        Data: message,
      }
      };
    setNewMessage(newMessage_)
      try{
     
        const res = await axios.post('https://eepow-chatbot-2023-phlyzwu6ga-uc.a.run.app/predict',
        {text: message});
        console.log(res)
        if(res.status === 200){
           const timeout = setTimeout(
            setNewMessage({
              message:{
                From: 'Eepow',
                Data: res.data
              }
            }),5000) 
            console.log("Get response successfully!")
        
        }else{
          console.error("Error get response");
        }}catch(err){
          console.error(err.message)
        }

  }
  const fetchConversations = async () => {
    try {
      // Make an API request to get conversations for the current user
      if (currentUser) {
        const response = await axios.get(`http://localhost:3001/get-conversations/${String(currentUser.uid)}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
      // Update state with the fetched conversations
      setConversations(response.data.conversations);

      // Set the active conversation to the first conversation (you can adjust this logic)
      if (response.data.conversations && response.data.conversations.length > 0) {
        setActiveConversation(response.data.conversations[0]);
      }}
    } catch (error) {
      console.log("Error fetching conversations:", error);
    }
  };

  console.log("activeConversation:", activeConversation);

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
        fetchConversations={fetchConversations}
      />
      <div className="flex flex-col w-full">
        <Conversation activeConversation={activeConversation} />
        <ChatInput updateMessage={updateMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
