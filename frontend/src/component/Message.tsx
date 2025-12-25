interface MessageProps {
  key: number,
  text: {
    roomId: string;
    message: string;
    sender: string
  },
  userName: string
}

const Message = ({ key, text, userName }:MessageProps) => {
  return (
    <div className={userName === text.sender ? "chat chat-end" : "chat chat-start"}>
      <div className="chat-header">
        {userName === text.sender ? "you" : text.sender}
      </div>
      <div className='chat-bubble chat-bubble-accent text-white font-bold text-xl' id={String(key)}>{text.message}</div>
    </div>
  )
}

export default Message