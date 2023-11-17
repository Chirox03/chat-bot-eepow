import React, { useState } from "react";
import Conversation from "./Conversation/Conversation";
import ChatInput from "./ChatInput";
import Sidebar from "./SideBar/SideBar.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuth from "../../AuthContext";
const ChatPage = () => {
  const { currentUser, login, logout } = useAuth();
  console.log("currentUser:", currentUser);
  const init_ = [{
    id : 0,
    name :"Eepow bot",
    data : [
      {
        sender: "bot",
        messages: "Hello, how can I help you?"
      }
    ]

  }
  ]
  const [conversations, setConversations] = useState(init_);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  console.log("activeConversation:", activeConversation);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log("New log in ")
      // ...
    } else {
      // User is signed out
      // ...
      console.log("New log out ")
    }
  });

  const updateMessage = (message,sender) => {
    console.log("message:", message);
    const idx = conversations.findIndex(x => x.id === activeConversation.id);
    console.log(idx)
    if (conversations[idx].data != undefined) {
      console.log("conversation ne:", init_[idx]);
      init_[idx].data.push({sender:sender,messages:message});
      setConversations(conversations)
      setActiveConversation(init_[idx]);
      console.log("conversation ne:", init_[idx]);

    }
  }
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
        <ChatInput updateMessage={updateMessage}/>
      </div>
    </div>
  );
};

export default ChatPage;
