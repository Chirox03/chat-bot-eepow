import React from "react";
import Menu from "./Menu";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
const Sidebar = ({ conversations, activeConversation, onConversationClick }) => {
  // useEffect hook to monitor changes in activeConversation
  useEffect(() => {
    // Perform any necessary actions based on the activeConversation change
  }, [activeConversation]);
  // onConversationClick(activeConversation.id);

  return (
    <div className="SideBar scrollbar-thin scrollbar-thumb-darker flex flex-col relative pt-6 md:w-64">
      <div className="flex flex-row items-center justify-center h-12 mar pt-6">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-dark h-10rem w-10rem">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 font-bold text-2xl">Eepow bot</div>
      </div>
      <div className="w-full mt-5">
      <Button size='lg' variant="outlined" fullWidth className="text-lg text-center py-2 h-10">New Chat +</Button>
      </div >
      {/* Active Conversations */}
      <div className="flex flex-grow overflow-y-auto flex-col flex-grow mt-4 mb-2">
        <div className="flex flex-row items-center justify-between text-xs m-2">
          <span className="font-bold">Active Conversations</span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 ">
        {conversations.map((conversation) => (
          <button
          onClick={() => onConversationClick(conversation.id)}
          key={conversation.id}
          className={
            "flex flex-row items-center rounded-xl p-2 " +
            (conversation.id == activeConversation.id ? "bg-light" : "bg-dark")
          }
          >
            <div className="flex items-center justify-center h-8 w-8 bg-beige rounded-full">
              {conversation.Tittle?.charAt(0)} 
            </div>
            <div className="ml-2 text-sm font-semibold">{conversation.Tittle}</div>
          </button>
        ))}
        </div>
      </div>

      {/* Logout Button */}
     
      <div className="flex-grow absolute bottom-0 left-0 w-full">
      <Menu />
      </div>
    </div>
  );
};

export default Sidebar;
