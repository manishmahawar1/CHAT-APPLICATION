import React, { useEffect, useState } from 'react'
import useAuthStore from "../Store/useAuthStore";
import useChatStore from "../Store/useChatStore";
import { LogOutIcon, VolumeOffIcon, Volume2Icon} from "lucide-react";
import { useNavigate } from "react-router-dom";


 const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {

  const { logout, authuser, updateProfile , checkAuth, onlineUsers} = useAuthStore();

  const { isSoundEnable, toggleSound, selectedUser } = useChatStore();
  const [ selectedImg, setselectedImg ] = useState(null);

 

  const handleImageUpload = (e) => {
    
    const file = e.target.files[0];
    if (!file) return

      const reader = new FileReader()
      reader.readAsDataURL(file)
    
    reader.onloadend = async () =>{
      const base64Image = reader.result;
      setselectedImg(base64Image)
      await updateProfile({profilePic: base64Image})
    }

  };

  useEffect(()=>{
   
    checkAuth()
  },[])

  // console.log(authuser);
  

  
   

  const navigate = useNavigate();
  return (
    <div className={`p-6 border-b border-slate-700/50 overflow-hidden ${selectedUser ? "hidden md:block" : ""}`}>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* AVATAR */}
          <div className={`avatar avatar-online`}>

            <label htmlFor="myAvatar" className='size-10 md:size-14 rounded-full overflow-hidden relative group bg-slate-600 cursor-pointer'>
              <img src={selectedImg || authuser.profilePic || "/avatar.png"} alt="profile image" className='object-cover size-full'  />
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center traansition-opacity'>
                <span className='text-white text-xs'>Change</span>
              </div>
            </label>
            <input type="file" accept='image/*' id='myAvatar'  className='hidden' onChange={handleImageUpload} />

          </div>

          {/* USERNSME & ONLINE TEXT */}

          <div>
              <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>{authuser?.name?.toUpperCase()}</h3>
              <p className='text-slate-400 text-xs'>Online</p>
          </div>
        </div>


        {/* Button Icons */}

        <div className='flex gap-4 items-center'>

          {/* LOGOUT BTN */}

          <button className='text-slate-400 hover:text-slate-200 transition-colors' onClick={logout}>
            <LogOutIcon  className="size-5"/>
          </button>

          {/* SOUND TOGGLE BTN */}

          <button
           className='text-slate-400 hover:text-slate-200 transition-colors cursor-pointer'
           onClick={()=> {
            // play click sound before toggling
             mouseClickSound.currentTime = 0;
             mouseClickSound.play().catch((error) => console.log("Audio play failed:", error))
             toggleSound();
          }}>
            {
              isSoundEnable ? (
                <Volume2Icon className='size-5'/>)
                :
                (
                  <VolumeOffIcon className='size-5'/>
                )
           }

          </button>

        </div>

      </div>

    </div>
  )
}

export default ProfileHeader
