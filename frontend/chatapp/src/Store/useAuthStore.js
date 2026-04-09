import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"


const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const useAuthStore = create((set, get) => (
    {
        authuser: null,
        isCheckingAuth: true,
        isSigningUp: false,
        isLoggingUp: false,
        socket: null,
        onlineUsers: [],
        

        checkAuth: async () => {
            try {
                const response = await axiosInstance.get("/api/auth/check")
                set({ authuser: response.data.user })
                // Connect with socket connection
                get().connectSocket()

            } catch (error) {
                console.log("Error in authCheck:", error);
                set({ authuser: null })
            } finally {
                set({ isCheckingAuth: false })
            }

        },

        signup: async (data) => {
            set({ isSigningUp: true })
            try {
                const response = await axiosInstance.post("/api/auth/signup", data)
                set({ authuser: response.data.user })
                toast.success("Account created successfully.")

                // connect with socket connection 
                get().connectSocket()

            } catch (error) {
                toast.error(error.response?.data?.message)
            } finally {
                set({ isSigningUp: false })
            }
        },

        login: async (data) => {
            set({ isLoggingUp: true })
            try {
                const response = await axiosInstance.post("/api/auth/login", data)
                set({ authuser: response.data.user })
                toast.success("Login successfully.")

                // connection wiyh socket 
                get().connectSocket()
            } catch (error) {
                toast.error(error.response?.data?.message)
            } finally {
                set({ isLoggingUp: false })
            }
        },

        logout: async () => {
            try {
                await axiosInstance.post("/api/auth/logout");
                set({ authuser: null })
                toast.success("Logged Out succesfully")

                //connect with socket disconnet function

                get().disconnectSocket()
            } catch (error) {
                toast.error("Error Logging Out")
            }
        },


        updateProfile: async (data) => {
            try {
                const response = await axiosInstance.put("/api/auth/updateprofile", data);
                set({ authuser: response.data.updatedUser })
                toast.success("Profile updated successfully.")
            } catch (error) {
                toast.error(error.response?.data?.message)
            }
        },

        connectSocket: () => {
            const { authuser } = get()
            if (!authuser || get().socket?.connected) return

            const socket = io(BASE_URL, { withCredentials: true })

            // Now coonect with socket.connect()
            socket.connect()

            // after socket connect , then set our states
            set({socket: socket})

            // Now listen for Online  users events

            socket.on("getOnlineUsers", (userIds)=>{

                set({onlineUsers: userIds})

            })



        },


        disconnectSocket: () =>{
          if(get().socket?.connected)  get().socket.disconnect()
        }
    }
))


export default useAuthStore;