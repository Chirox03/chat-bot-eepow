import React from 'react'
import classNames from 'classnames';
function Message({message}) {
    
  return (
    <div 
    className={classNames(
       message.sender === "Eepow" ? "justify-start" : "justify-end",
         "flex flex-row items-center my-2")
    }>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dark flex-shrink-0">
        {message.sender.charAt(0)}
        </div>
        <div className="relative ml-3 text-sm bg-beige py-2 px-4 shadow rounded-xl">
        <div>{message.messages}</div>
        </div>
    </div>
  )
}

export default Message
