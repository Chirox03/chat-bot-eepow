import React from "react";
import Conversation from "./Conversation";
import ChatInput from "./ChatInput";
import Sidebar from "./SideBar/SideBar.js";
const ChatPage = () => {
  return (
    <div className="ChatPage">
        <Sidebar />
      <div className="flex flex-col h-full w-full overflow-x-hidden">
      <Conversation />
      <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
