import React from "react";
import Menu from "./Menu";

const Sidebar = () => {
  const handleLogout = () => {
    // Perform logout functionality here
  };

  return (
    <div className="SideBar flex flex-col relative pt-6">
      <div className="flex flex-row items-center justify-center h-12 mar pt-6">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
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
      {/* Active Conversations */}
      <div className="flex flex-col flex-grow mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {/* Active conversation buttons */}
          {/* Replace the placeholder content below with your active conversations */}
          {/* Example button */}
          <button className="flex flex-row items-center bg-light hover:bg-light/80 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-beige rounded-full">H</div>
            <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
          </button>
          {/* Add more active conversation buttons as needed */}
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
