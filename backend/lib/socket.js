import { Server } from "socket.io";
import socketAuthMiddleware from "../middleware/socketAuthMiddleware.js";

let io;
const userSocketMap = {};

/**
 * Initialize Socket Server
 */
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                process.env.CLIENT_URL
            ],
            credentials: true
        }
    });

    // Auth middleware for socket
    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
        const userId = socket.user?.id;
        const userName = socket.user?.name;

        console.log("🟢 User connected:", userName);

        // save online user
        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        // broadcast online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // disconnect event
        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", userName);

            if (userId) {
                delete userSocketMap[userId];
            }

            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    return io;
};

/**
 * Get receiver socket id
 */
export const getreceiverSocketId = (userId) => {
    return userSocketMap[userId];
};

/**
 * Export io instance (optional use)
 */
export { io };