import React from 'react'
import useChatStore from '../Store/useChatStore'

const ActiveTabSwitch = () => {

  const {activeTab, setActiveTab, selectedUser} = useChatStore();
  return (
    <div className={`tabs ${selectedUser? "hidden md:flex" : ""}  tabs-boxed flex bg-transparent p-2 m-2`}>

      <button onClick={()=> setActiveTab("chats")}
       className={`tab flex-1 text-center rounded ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}>Chats</button>
      <button onClick={()=> setActiveTab("contacts")}
        className={`tab flex-1 text-center rounded ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}>Contacts</button>
      
    </div>
  )
}

export default ActiveTabSwitch
