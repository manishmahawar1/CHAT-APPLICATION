import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

const notificationSound = new Audio("/sounds/notification.mp3");

const useChatStore = create((set, get) => (
    {
        allContact: [],
        chats: [],
        messages: [],
        activeTab: "chats",
        selectedUser: null,
        isUserLoading: false,
        isMessagesLoading: false,
        isSoundEnable: JSON.parse(localStorage.getItem("isSoundEnable") ?? true),


        toggleSound: () => {
            localStorage.setItem("isSoundEnable", !get().isSoundEnable)
            set({ isSoundEnable: !get().isSoundEnable })
        },

        setActiveTab: (tab) => set({ activeTab: tab }),
        setSelectUser: (user) => set({ selectedUser: user }),

        getAllContacts: async () => {
            set({ isUserLoading: true })
            try {
                const response = await axiosInstance.get("/api/messages/contact");
                set({ allContact: response.data.filterUser })
            } catch (error) {
                toast.error(error.response?.data?.message)
            } finally {
                set({ isUserLoading: false })
            }

        },

        getMyChatPartners: async () => {
            set({ isUserLoading: true })
            try {
                const response = await axiosInstance.get("/api/messages/chats");
                set({ chats: response.data.chatPartners })
            } catch (error) {
                toast.error(error.response?.data?.message)
            } finally {
                set({ isUserLoading: false })
            }
        },

        getMessagesByUserId: async (userId) => {
            set({ isMessagesLoading: true })
            try {
                const response = await axiosInstance.get(`/api/messages/${userId}`);
                set({ messages: response.data.messages })

            } catch (error) {
                toast.error(error.response?.data?.message)
            } finally {
                set({ isMessagesLoading: false })
            }
        },


        sendMessage: async (messageData) => {
            const { selectedUser, messages } = get()
            // How to use differen Store states
            const { authuser } = useAuthStore.getState();

            const tempId = `temp-${Date.now()}`
            const optimisticMessage = {
                _id: tempId,
                senderId: authuser._id,
                receiverId: selectedUser._id,
                text: messageData.text,
                image: messageData.image,
                createdAt: new Date().toISOString(),
                isOptimistic: true,
            }
            // Immideatly update UI Quick message show in ui
            set({ messages: [...messages, optimisticMessage] })
            try {
                const response = await axiosInstance.post(`/api/messages/send/${selectedUser._id}`, messageData)
                set({ messages: messages.concat(response.data.newMessage) })
            } catch (error) {
                set({ messages: messages }) // If APi will Fail then optimistic message also remove
                toast.error(error.response?.data?.message)
            }
        },

        subcribeToMessages: () => {
            const { selectedUser, isSoundEnable } = get();
            if (!selectedUser) return;

            const socket = useAuthStore.getState().socket;

            socket.on("newMessage", (newMessage) => {

                if (newMessage.senderId !== selectedUser?._id) return
                const prevMessages = get().messages;
                set({ messages: [...prevMessages, newMessage] });

                if (isSoundEnable) {
                    notificationSound.currentTime = 0; //reset to start
                    notificationSound.play().catch((err) => console.log("Audio play failed!", err)
                    );
                }
            })


        },

        unsubscribeFromMessages: () => {
            const socket = useAuthStore.getState().socket;
            socket.off("newMessage");
        },





    }
))


export default useChatStore;