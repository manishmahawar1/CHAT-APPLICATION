import { MessageCircle } from 'lucide-react'
import React from 'react'

const NoConversationPlaceholder = () => {
  return (
    <div className='flex items-center justify-center flex-col gap-3 w-full h-full p-6 '>
            <div className='w-30 h-30 rounded-full bg-cyan-500/10 text-center  flex justify-center items-center mb-6 '>
                    <MessageCircle  className='size-10 text-cyan-400 hover:text-slate-200'/>
            </div>

            <div>
                <h3 className='tracking-tight font-bold italic text-white text-xl'>Select a Conversation</h3>
            </div>
            <div>
                <p className='text-slate-400 text-center max-w-md'>
                    Choose a contact from the sidebar to start chating or <br />
                    continue a previous conversation.
                </p>
            </div>
    </div>
  )
}

export default NoConversationPlaceholder
