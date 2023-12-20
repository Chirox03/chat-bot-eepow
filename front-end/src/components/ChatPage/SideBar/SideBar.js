import React from "react";
import Menu from "./Menu";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import useAuth from "../../../AuthContext";
import Conversation from "../Conversation/Conversation";
const Sidebar = ({ conversations, activeConversation, onConversationClick ,fetchConversations}) => {
  // useEffect hook to monitor changes in activeConversation
  useEffect(() => {
    // Perform any necessary actions based on the activeConversation change
  }, [activeConversation]);
  // onConversationClick(activeConversation.id);
  const { currentUser, login, logout } = useAuth();
  const handleNewChat = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/add-conversation', {
      userID: currentUser.uid,
      Tittle: "New chat"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    fetchConversations();
  }
  return (
    <div className="SideBar flex flex-col relative pt-2 md:w-64">
      <div className="flex flex-row items-center justify-center h-12 mar pt-6">
        <div className="bg-dark h-10 w-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <g data-name="chat android app aplication phone">
              <path fill="#ffffff" d="M30.56 8.47a8 8 0 0 0-7-7 64.29 64.29 0 0 0-15.06 0 8 8 0 0 0-7 7 64.29 64.29 0 0 0 0 15.06 8 8 0 0 0 7 7 64.29 64.29 0 0 0 15.06 0 8 8 0 0 0 7-7 64.29 64.29 0 0 0 0-15.06zm-2 14.83a6 6 0 0 1-5.28 5.28 63.65 63.65 0 0 1-14.6 0 6 6 0 0 1-5.26-5.28 63.65 63.65 0 0 1 0-14.6A6 6 0 0 1 8.7 3.42a63.65 63.65 0 0 1 14.6 0 6 6 0 0 1 5.28 5.28 63.65 63.65 0 0 1 0 14.6z"/>
              <path fill="#ffffff" d="M16 8C9.93 8 5 11.59 5 16c0 2.43 1.45 4.66 4 6.18V25a1 1 0 0 0 1.55.83l3-2A15 15 0 0 0 16 24c6.07 0 11-3.59 11-8s-4.93-8-11-8zm0 14a13.6 13.6 0 0 1-2.44-.23 1 1 0 0 0-.74.15L11 23.13v-1.54a1 1 0 0 0-.53-.88C8.26 19.55 7 17.83 7 16c0-3.31 4-6 9-6s9 2.69 9 6-4 6-9 6z"/>
              <circle fill="#ffffff" cx="16" cy="16" r="1"/><circle fill="#ffffff" cx="20" cy="16" r="1"/><circle fill="#ffffff" cx="12" cy="16" r="1"/></g></svg>
        </div>
        <div className="ml-2 font-head text-white font-extrabold text-2xl">Eepow bot</div>
        </div>
      <div className="w-full mt-5">
      <Button onClick={handleNewChat} size='lg' variant="outlined" fullWidth className="text-md hover:bg-light bg-dark font-head font-extrabold text-center py-2 h-10">
        <span>
          New chat
        </span>
        </Button>
      </div >
      <span className="font-head font-bold text-base mx-3 pt-2">Active chat</span>
      {/* Active Conversations */}
      <div className="flex flex-grow  scroll-auto overflow-y-auto flex-col flex-grow mb-2 border-t-2">
        <div className="flex flex-col space-y-1 mt-4 mr-2">
        {conversations.map((conversation) => (
          Boolean(conversation.Hidden)===false ?(
            <button
            onClick={() => onConversationClick(conversation.id)}
            key={conversation.id}
            className={
              "flex flex-row items-center rounded-xl p-2 " +
            (conversation.id == activeConversation.id ? ("bg-light") : ("bg-dark"))
          }
          >
            <div className="flex items-center justify-center h-8 w-8 bg-beige border-2 border-dark rounded-full">
              {conversation.Tittle?.charAt(0)}
            </div>
            <div className="ml-2 text-sm font-semibold">{conversation.Tittle}</div>
          </button>
        ):(null)
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
