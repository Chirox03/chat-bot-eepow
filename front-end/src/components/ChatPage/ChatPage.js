import React, { useState } from "react";
import Conversation from "./Conversation/Conversation";
import ChatInput from "./ChatInput";
import Sidebar from "./SideBar/SideBar.js";

const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState(0);
  const conversations = [
    {
      id: 0,
      name: "What is OOP?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
      ],
    },
    {
      id: 1,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ],
    },
    {
      id: 2,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ],
    },
    {
      id: 9,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ],
    },
    {
      id: 4,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ]
    },
    {
      id: 8,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ]
    },
    {
      id: 5,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ]
    },
    {
      id: 6,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ]
    },
    {
      id: 7,
      name: "Hello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ]
    },
    {
      id: 7,
      name: "pello Eepow?",
      data: [
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },
        { sender: "Eepow", messages: "Hello J" },
        { sender: "J", messages: "Hello Pikcachu" },

      ]
    },
  ];

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
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
