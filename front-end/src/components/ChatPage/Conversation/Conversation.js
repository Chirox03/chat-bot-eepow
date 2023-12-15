import React, {useState, useEffect, createRef } from "react";
import Message from "./Message";
import axios from "axios";
import { useRef } from "react"
const Conversation = ({ activeConversation }) => {
  const fetchMessages = async (conversationID) => {
    try {
      const response = await axios.get(`http://localhost:3001/get-messages/${conversationID}`);
  
      if (response.status === 200) {
        const messages = response.data.Messages;
        console.log("Fetched messages:", messages);
        return messages;
      } else {
        console.error("Error fetching messages:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  const [fetchedMessages, setFetchedMessages] = useState([]);

  useEffect(() => {
    console.log("Current Conversation chat", activeConversation);

    const fetchMessagesForActiveConversation = async () => {
      if (activeConversation && activeConversation.id) {
        const messages = await fetchMessages(activeConversation.id);
        setFetchedMessages(messages);
      }
    };

    fetchMessagesForActiveConversation();
  }, [activeConversation]);
  const ref = createRef();
  useEffect(() => {
    if(fetchedMessages){
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  },[fetchedMessages])
  return (
    <div className="Conversation">
      <div className="no-scrollbar relative w-full p-5 m-0 overflow-scroll bg-light space-y-2">
        {activeConversation && fetchedMessages
          ? fetchedMessages.map((item, index) => (
              <div key={item.id} className="p-3 rounded-lg col-start-1 col-end-13">
                <Message
                  message={{
                    From: item.From,
                    Data: item.Data,
                  }}
                />
                <div
                  className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
                </div>
              </div>
            ))
          : null}
          <div ref={ref} />
      </div>
    </div>
  );
};

export default Conversation;
