import { Server } from "socket.io";
import http from "http"
import express from "express";
import dotenv from "dotenv";
import socketAuthMiddleware from "../middleware/socketAuthMiddleware.js";

dotenv.config()

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true
    }
})

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware)


// For storing online Users
const userSocketMap = {};  // { userId: socketId }

// we will use this function to check user is online or not
const getreceiverSocketId = (userId)=>{

    return  userSocketMap[userId]
}


//Making Connection 

io.on("connection", (socket) => {
    console.log("A user connection", socket.user.name);


    // when a user connects that means we have to update online users list mean we have to update userSocketMap

    // first we need userId 
    const userId = socket.userId;

    //Now update userSocketMap (online users)

    userSocketMap[userId] = socket.id;

    //    Now io.emit() is used to send events to all connected client

    io.emit("getOnlineUsers", Object.keys(userSocketMap)) //Object.keys gives you only userId every time


    //when a user disconnected we have to call this disconnect event and remove that user userId
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.name);
        delete userSocketMap[userId]

        // When we delete that user we have to send this to all client thats why we use io.emit() again

        io.emit("getOnlineUsers", Object.keys(userSocketMap)) //Object.keys gives you only userId every time


    })

})


export { io, app, server, getreceiverSocketId }