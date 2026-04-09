import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./Pages/SignUp"
import ChatPage from "./Pages/ChatPage"
import Login from "./Pages/Login"
import useAuthStore from "./Store/useAuthStore"
import { useEffect } from "react"
import PageLoader from "./Components/PageLoader"
import { Toaster } from "react-hot-toast"



function App() {

  const { checkAuth, isCheckingAuth, authuser } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckingAuth) {
    return <PageLoader />
  }


  return (
    <div className="min-h-screen w-full flex items-center justify-center  bg-slate-900 relative p-4 overflow-hidden">

      {/* DECORATORS  - GRID BG & GLOW SHAPES */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-10" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-600 opacity-20 blur-[100px] z-10" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-400 opacity-20 blur-[100px] z-10" />

     

        
        <Routes>
          <Route path="/" element={authuser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/signup" element={!authuser ? <SignUp /> : <Navigate to={"/"} />} />
          <Route path="/login" element={!authuser ? <Login /> : <Navigate to={"/"} />} />
        </Routes>
   


      

      <Toaster />
    </div>
  )
}

export default App
