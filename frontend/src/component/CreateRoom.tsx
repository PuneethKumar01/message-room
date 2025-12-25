import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../util/axios'

const CreateRoom = ({name}:{name:string}) => {

  const [RoomId, setRoomId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const createRoom = async () => {
      try {
        const res = await api.get("/create-room")
        setRoomId(res.data.roomId)
      } catch (err) {
        setRoomId("Failed to create room")
      } finally {
        setLoading(false)
      }
    }
    createRoom()
  }, [])

  const navigate = useNavigate()

  const handleEnterRoom = ()=>{
    if(!RoomId || !name) return;
    navigate(`/room/${RoomId}?name=${encodeURIComponent(name)}`)
  }

  return (
    <div className='container card bg-base-200 max-w-md mx-auto mt-12'>

      <div className="card-body">
        <h2 className="card-title justify-center text-3xl ">Create Room</h2>
        <div className='flex justify-center mt-8'>
          {loading ? (
            <div className='skeleton h-12 w-28' />
          ) : (
            <div className='input text-2xl justify-center'> {RoomId}</div>
          )}
        </div>
      </div>
      <div className="card-actions justify-center mt-8">
        <button className='btn btn-primary w-xs mb-8' onClick={handleEnterRoom}>Enter Room</button>
      </div>

    </div>
  )
}

export default CreateRoom