import { useEffect, useState } from 'react'
import Message from '../component/Message'
import { Send } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'
import { socket } from '../util/socket'


const App = () => {

  interface Message {
    roomId: string;
    message: string;
    sender: string;
  }

  const { roomId } = useParams();
  const [searchParams] = useSearchParams()
  const name = searchParams.get("name")

  const [content, setContent] = useState('')
  const [message, setMessage] = useState<Message[]>([])

  useEffect(() => {

    if (!roomId || !name) return

    socket.connect()

    const onConnect = () => {
      console.log("connected:", socket.id);
      socket.emit("join-room", roomId)
    }

    const onReceviveMessage = (msg: Message) => {
      setMessage((prev) => [...prev, msg])

    }

    socket.on("connect", onConnect)

    socket.on('receive-message', onReceviveMessage)

    return () => {
      socket.off("connect", onConnect)
      socket.off("receive-message", onReceviveMessage)
      socket.disconnect()
    }
  }, [roomId, name])

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!roomId || !name) return

    setMessage((prev) => [...prev, {
      roomId: roomId,
      message: content,
      sender: name
    }])

    console.log(content)
    socket.emit("send-message", {
      roomId: roomId,
      message: content,
      sender: name
    })
    setContent("")
  }
  return (
    <div className='h-[calc(100vh-72px)] flex flex-col p-8'>
      <div className="flex-1 overflow-auto p-8">
        {message.map((msg, idx) => {
          if (!name) return null
          return <Message key={idx} text={msg} userName={name}/>
        })}
      </div>
      <div className="flex justify-center ">
        <form className='bg-base-200 flex space-x-8 border-2 border-slate-500  px-16 py-4 rounded' onSubmit={handleForm}>
          <input className='input input-lg input-primary  ' type="text" placeholder='Type your Message here' value={content} onChange={(e) => { setContent(e.target.value) }} />
          <button className='btn btn-lg btn-secondary ' type="submit"><Send size={30} color='white' strokeWidth={2} /></button>
        </form>
      </div>
    </div>
  )
}

export default App