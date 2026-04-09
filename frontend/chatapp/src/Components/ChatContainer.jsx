import React, { useEffect, useRef } from 'react'
import useChatStore from '../Store/useChatStore'
import useAuthStore from '../Store/useAuthStore';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessageInput from './MessageInput';
import MessagesLoadingSkeleton from './MessagesLoadingskeleton';

const ChatContainer = () => {

    const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subcribeToMessages, unsubscribeFromMessages } = useChatStore();
    const { authuser } = useAuthStore();

    const messageEndRef = useRef(null);


    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])



    useEffect(() => {
        if (!selectedUser?._id) return;

        getMessagesByUserId(selectedUser._id);
        subcribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser?._id]);



    // useEffect(() => {
    //     if (selectedUser?._id) {
    //         getMessagesByUserId(selectedUser._id)
    //         subcribeToMessages();
    //     }
    //     return ()=> unsubscribeFromMessages()
    // }, [selectedUser, getMessagesByUserId, subcribeToMessages, unsubscribeFromMessages])

    // console.log(messages);


    return (
        <div className='flex flex-col h-full'>
            <ChatHeader />

            <div className='flex-1 px-6 overflow-y-auto py-8'>
                {
                    messages.length > 0 && !isMessagesLoading ?
                        (
                            <div className='max-w-3xl mx-auto space-y-6'>
                                {
                                    messages.map((msg) => (
                                        <div key={msg._id}
                                            className={`chat ${msg.senderId === authuser._id ? "chat-end" : "chat-start"}`} >
                                            <div className={`chat-bubble relative ${msg.senderId === authuser._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                                                {msg.image && (
                                                    <img src={msg.image} alt="shared" className='rounded-lg h-48 object-cover' />
                                                )}
                                                {msg.text && <p className='mt-2'>{msg.text}</p>}
                                                <p className='text-xs mt-1 opacity-75 flex items-center gap-1'>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        </div>
                                    ))
                                }

                                {/* For Scroll Down thw  scroll bar when new message arrived */}
                                <div ref={messageEndRef} />
                            </div>
                        ) : isMessagesLoading ? <MessagesLoadingSkeleton /> :
                            (
                                <NoChatHistoryPlaceholder name={selectedUser.name} />

                            )
                }
            </div>

            <MessageInput />

        </div>
    )
}

export default ChatContainer
