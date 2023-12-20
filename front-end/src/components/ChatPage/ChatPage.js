import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./SideBar/SideBar.js";
import Conversation from "./Conversation/Conversation";
import ChatInput from "./ChatInput";
import useAuth from "../../AuthContext";

const ChatPage = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchConversations();
  }, [currentUser]);

  useEffect(() => {
    async function refetch() {
      try {
        const response = await axios.post(`http://localhost:3001/update-messages/${activeConversation.id}`, newMessage);

        if (response.status === 200) {
          console.log('Message updated successfully:', response.data);
        } else {
          console.error('Error updating message:', response.status, response.data);
        }
      } catch (error) {
        console.error('Error updating message:', error.message);
      }
      if (newMessage && newMessage.From !== 'Eepow') {
        setNewMessage('');
      }
    }
    refetch();
  }, [newMessage, activeConversation]);

  const updateMessage = async (message, sender) => {
    const newMessage_ = {
      message: {
        From: sender,
        Data: message,
      },
    };
    setNewMessage(newMessage_);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3001/get-response', { text: message });

      if (res.status === 200) {
        const timeout = setTimeout(
          setNewMessage({
            message: {
              From: 'Eepow',
              Data: res.data,
            },
          }),
          5000
        );
        console.log('Get response successfully!');
        setLoading(false);
      } else {
        console.error('Error getting response');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchConversations = async () => {
    try {
      if (currentUser) {
        const response = await axios.get(`http://localhost:3001/get-conversations/${String(currentUser.uid)}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setConversations(response.data.conversations);
        console.log("fetched conversations",response.data.conversations)
        if (response.data.conversations && response.data.conversations.length > 0) {
          setActiveConversation(response.data.conversations[0]);
        }
      }
    } catch (error) {
      console.log("Error fetching conversations:", error);
    }
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
        fetchConversations={fetchConversations}
      />
      <div className="flex flex-col w-full">
        <Conversation activeConversation={activeConversation} newMessage={newMessage} isLoading={loading} />
        <ChatInput updateMessage={updateMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
