import React, { useState } from "react";
import Conversation from "./Conversation/Conversation";
import ChatInput from "./ChatInput";
import Sidebar from "./SideBar/SideBar.js";

const ChatPage = ({user,updateUser}) => {
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
  console.log(user);
  const [conversations, setConversations] = useState(init_);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const updateMessage = (message,sender) => {
    const idx = conversations.findIndex(x => x.id === activeConversation.id);
    if (conversations[idx].data != undefined) {
      init_[idx].data.push({sender:sender,messages:message});
      setConversations(conversations)
      setActiveConversation(init_[idx]);

    }
  }
  const handleConversationClick = (conversationId) => {
    const selectedConversation = conversations.find((conversation) => conversation.id === conversationId);
    setActiveConversation(selectedConversation);
    // console.log("Conversation clicked: ", conversationId);
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
