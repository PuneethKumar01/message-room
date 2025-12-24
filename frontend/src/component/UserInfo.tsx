import React, { useState } from 'react'


type Props = {
    name: string;
    setName: (v: string) => void;
    setAction: (v: "create" | "join") => void;
}

const UserInfo = ({ name, setName, setAction }: Props) => {



    return (
        <div className="card bg-base-300 max-w-2xl mx-auto mb-4 mt-10 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-2xl">
                    Create or Join Room
                </h2>
                <div className="space-y-8">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>

                        <input
                            className='input input-bordered w-full'
                            type="text"
                            placeholder='Enter your Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center gap-4">
                        <button className='btn btn-primary' type='submit' disabled={!name} onClick={() => setAction("create")}>
                            Create Room
                        </button>
                        <button className='btn btn-secondary btn-outline' type='submit' disabled={!name} onClick={() => setAction("join")}>
                            Join Room
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserInfo
