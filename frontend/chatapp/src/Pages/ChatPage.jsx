import React, { useEffect } from 'react'
import { useState } from 'react'
import useAuthStore from '../Store/useAuthStore'
import useChatStore from '../Store/useChatStore'
import ProfileHeader from '../Components/ProfileHeader'
import ActiveTabSwitch from '../Components/ActiveTabSwitch'
import ChatsList from '../Components/ChatsList'
import ContactList from '../Components/ContactList'
import ChatContainer from '../Components/ChatContainer'
import NoConversationPlaceholder from '../Components/NoConversationPlaceholder'


const ChatPage = () => {
  const { logout } = useAuthStore()
  const { allContact, getAllContacts, getMyChatPartners, chats, activeTab, selectedUser, setSelectUser } = useChatStore();

  // useEffect(() => {
  //   getAllContacts();
  //   getMyChatPartners();
  // }, []);

  // console.log(allContact, chats);

  // console.log("Selected User:", selectedUser);


  return (
    <div className='relative z-50 w-full max-w-6xl h-[800px] bg-slate-900 overflow-hidden'>
      <div className='flex h-full flex-col md:flex-row'>
        {/* Left Side */}
        <div className='w-full md:max-w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
          <ProfileHeader/>
          <ActiveTabSwitch />

          <div className='flex-1  overflow-y-auto p-2 md:p-4 space-y-2'>
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE  */}

        <div className='flex-1 flex-col bg-slate-900/50 backdrop-blur-sm'>
         {selectedUser ? <ChatContainer/> : <NoConversationPlaceholder/> }
        </div>



      </div>
    </div>
  )
}

export default ChatPage
