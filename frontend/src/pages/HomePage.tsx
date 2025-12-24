import React, { useState } from 'react'
import UserInfo from '../component/UserInfo'
import CreateRoom from '../component/CreateRoom'
import JoinRoom from '../component/JoinRoom'

const HomePage = () => {

    type Action = "create" | "join" | null;

    const [name, setName] = useState("")
    const [action, setAction] = useState<Action>(null)

    return (
        <div className="container mx-auto">
            {action === null && < UserInfo
                name={name}
                setName={setName}
                setAction={setAction}
            />}

            {action === 'create' && <CreateRoom />}
            {action === 'join' && <JoinRoom />}
        </div>
    )
}

export default HomePage