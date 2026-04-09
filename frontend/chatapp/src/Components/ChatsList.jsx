import React, { useEffect } from 'react'
import useChatStore from '../Store/useChatStore'
import UserLoadingSkeleton from './UserLoadingSkeleton';
import NoChatsFound from './NoChatsFound';
import useAuthStore from '../Store/useAuthStore';

const ChatsList = () => {

  const { chats, isUserLoading, setSelectUser, getMyChatPartners, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners()
  }, [getMyChatPartners])

  if (isUserLoading) {
    return <UserLoadingSkeleton />

  }
  if (chats.length === 0) {
    return <NoChatsFound />
  }
  return (
    <div className="overflow-y-auto box-scroll space-y-2"
    
    >

      {chats.map((chat) => (
        <div key={chat._id}
           className={`gap-3 bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors ${selectedUser ? "hidden md:flex" : ""}`}
          onClick={() => setSelectUser(chat)}>

          <div className='flex items-center gap-3'>
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "avatar-online" : "avatar-offline"}`}>
              <div className='size-12 rounded-full'>
                <img src={chat.profilePic || "/avatar.png"} alt={chat.name} />
              </div>
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{chat.name}</h4>
          </div>

        </div>
      ))}
    </div>
  )
}

export default ChatsList
