import React from 'react';
import classNames from 'classnames';

function Message({ message }) {
  // Check if message is undefined or null
  if (!message) {
    return null; // or return a placeholder, depending on your use case
  }

  // Check if required properties are present in the message object
  if (!message.From || !message.Data) {
    return null; // or handle the missing properties appropriately
  }

  return (
    <div
      className={classNames(
        message.From === 'Eepow' ? 'justify-start' : 'justify-end',
        'flex flex-row items-center my-2'
      )}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dark flex-shrink-0">
        {message.From.charAt(0)}
      </div>
      <div className="relative ml-3 text-sm bg-beige py-2 px-4 shadow rounded-xl">
        <div>{message.Data}</div>
      </div>
    </div>
  );
}

export default Message;
