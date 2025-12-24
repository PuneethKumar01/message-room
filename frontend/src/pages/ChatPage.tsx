import React, { type HtmlHTMLAttributes } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { io } from 'socket.io-client'
import Message from '../component/Message'
import { Send } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'


const socket = io("http://localhost:5001")

const App = () => {

  interface Message {
    roomId: string;
    message: string;
    sender: string;
  }

  const [searchParams] = useSearchParams()
  const name = searchParams.get("name")
  console.log(name)

  const { roomId } = useParams();
  const [content, setContent] = useState('')
  const [message, setMessage] = useState<Message[]>([])
  console.log(name, roomId)

  useEffect(() => {

    // if (!room) {
    //   console.error("error")
    //   return
    // }

    const handleConnecion = () => {
      console.log("connected:", socket.id);
      console.log(roomId)
      socket.emit("join-room", roomId)
    }

    socket.on("connect", handleConnecion)

    socket.on('receive-message', (msg) => {
      setMessage((prev) => [...prev, msg])
      console.log(msg)
    })

    return () => { socket.off("receive-message") }
  }, [])

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
          return <Message key={idx} text={msg} />
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