import React from 'react'

interface MessageProps {
  key: number,
  text: {
    roomId: string;
    message: string;
    sender: string}
}

const Message = ({ key, text }:MessageProps) => {
  return (
    <div className="chat chat-end">
      <div className="chat-header">
        {text.sender}
      </div>
      <div className='chat-bubble chat-bubble-accent text-white font-bold text-xl' id={String(key)}>{text.roomId}</div>
    </div>
  )
}

export default Message