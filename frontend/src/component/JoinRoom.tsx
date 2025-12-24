import { ArrowLeft } from 'lucide-react'
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'


type Props = {
    setAction: (v: "join" | null) => void;
    name: string;
}

const JoinRoom = ({ setAction, name }: Props) => {

    const [roomId, setRoomId] = useState(Array(6).fill(""))
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const navigate = useNavigate()


    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, [])

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newRoomId = [...roomId]
        newRoomId[index] = value;
        setRoomId(newRoomId)

        if (value && index < roomId.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !roomId[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handleSubmit = async () => {
        const finalRoomId = roomId.join("")

        // if (finalRoomId.length !== 6) {
        //     alert("Enter a valid 6-digit room ID");
        //     return;
        // }

        try {
            // const res = await axios.get(`/api/join-room/${finalRoomId}`)
            // console.log(res.data.roomId)

            // if (!res.data.roomId) {
            //     alert("room not found")
            //     return
            // }

            navigate(`/room/${finalRoomId}?name=${encodeURIComponent(name)}`)
        } catch (error) {

        }


    }

    return (
        <div className='card bg-base-300 max-w-sm m-auto mt-8 shadow-xl'>
            <button className='btn btn-ghost btn-circle' onClick={() => { setAction(null) }}>
                <ArrowLeft />
            </button>
            <div className="card-body">
                <h2 className="card-title flex justify-center text-3xl mb-8">Join Room</h2>
                <p className="text-center text-sm opacity-70">
                    Enter the 6-digit room code
                </p>
                <div className="flex gap-2 m-auto">
                    {roomId.map((digits, index) => (
                        <input
                            type="text"
                            key={index}
                            ref={(el) => { inputsRef.current[index] = el }}
                            inputMode='numeric'
                            maxLength={1}
                            value={digits}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className='input input-primary size-10 text-center '
                        />
                    ))}
                </div>
                <div className="card-action">
                    <button className='btn btn-secondary w-full mt-8' onClick={handleSubmit}>Join</button>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom