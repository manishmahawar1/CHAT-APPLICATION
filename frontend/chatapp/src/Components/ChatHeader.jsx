import React, { useEffect } from 'react'
import useChatStore from '../Store/useChatStore'
import { XIcon } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

const ChatHeader = () => {

    const { selectedUser, setSelectUser } = useChatStore();
    const { onlineUsers} = useAuthStore();





    useEffect(() => {
        const handleEsckey = (event) => {
            if (event.key === "Escape") {
                setSelectUser(null)
            }
        }

        window.addEventListener("keydown", handleEsckey)

        // Clean function

        return () => window.removeEventListener("keydown", handleEsckey)
    },[setSelectUser]);







    return (
        <div className={`flex justify-between items-center bg-slate-800/50 border-l border-b  border-slate-700/50  p-6 `}>

            {/* USER Status */}
            <div className='flex items-center space-x-3 py-1'>
                <div className={`avatar ${onlineUsers.includes(selectedUser._id) ? "avatar-online" : "avatar-offline"}`}>
                    <div className='w-12 rounded-full'>
                        <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.name} />
                    </div>
                </div>

                <div>
                    <h3 className='text-slate-200 font-medium'>{selectedUser.name}</h3>
                    <p className='text-slate-400 text-sm'>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                </div>
            </div>

            {/* CROSS ICON */}
            <button onClick={() => setSelectUser(null)}>
                <XIcon className='h-5 w-5 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors' />
            </button>
        </div>
    )
}

export default ChatHeader
