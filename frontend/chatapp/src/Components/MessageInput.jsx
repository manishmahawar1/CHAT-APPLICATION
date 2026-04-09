import React, { useRef, useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound.js'
import useChatStore from '../Store/useChatStore.js';
import toast from 'react-hot-toast';
import { ImageIcon, SendIcon, XIcon } from 'lucide-react';

const MessageInput = () => {
  const { sendMessage, isSoundEnable } = useChatStore();
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef()


  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!text.trim() && !imagePreview) return
    if (isSoundEnable) {
      playRandomKeyStrokeSound()
    }

    sendMessage({
      text: text.trim(),
      image: imagePreview
    })

    setText("")
    setImagePreview("")
    if (fileInputRef.current) fileInputRef.current.value = ""

  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = ""


  }




  return (
    <div className='p-4 md:p-6 border-t border-slate-700/50'>
      {imagePreview && (
        <div className='max-w-72  md:max-w-3xl  mb-3 flex items-center '>
          <div className='relative'>
            <img src={imagePreview} alt="Preview" className='h-18 w-18 object-cover rounded-lg border border-slate-700' />

            <button onClick={removeImage} className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700 '>
              <XIcon className='w-4 h-4' />
            </button>
          </div>



        </div>
      )}

      <form onSubmit={handleSendMessage} className='max-w-3xl mx-auto flex space-x-4'>
        <input type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            isSoundEnable && playRandomKeyStrokeSound()
          }}
          className='flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg w-40 text-sm py-2 px-4 focus:outline-none'
          placeholder='Type your message...'
        />

        <input type="file" ref={fileInputRef} accept='image/*' onChange={handleImageChange} className='hidden' />

        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400  hover:text-slate-200 rounded-lg px-2 md:px-4 transition-colors ${imagePreview ? "text-cyan-500" : ""}`}>
          <ImageIcon className='w-5 h-5' />
        </button>

        <button type='submit'
          disabled={!text.trim() && !imagePreview}
          className='bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-2 py-2 md:px-4 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
          <SendIcon className='w-5 h-5' />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
