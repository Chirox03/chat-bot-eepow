// Conversation.js
import React from "react";

const Conversation = () => {
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Conversation items */}
            {/* Replace the placeholder content below with your conversation items */}
            <div className="col-start-1 col-end-8 p-3 rounded-lg">
              <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  A
                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <div>Hey How are you today?</div>
                </div>
              </div>
            </div>
            {/* Add more conversation items as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
