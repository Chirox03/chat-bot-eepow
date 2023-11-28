import React from 'react';
import classNames from 'classnames';

function Message({ message }) {
  //console.log("Message", message);
  return (
    <div
      className={classNames(
        message.From === 'Eepow' ? 'justify-start' : 'justify-end',
        'flex flex-row items-center my-2'
      )}
    >
      {message.From === 'Eepow' ?
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dark flex-shrink-0">
         {message.From.charAt(0)}
      </div> : null}
      <div className="relative ml-3 text-sm bg-beige py-2 px-4 shadow rounded-xl">
        <div>{message.Data}</div>
      </div>
    </div>
  );
}

export default Message;
