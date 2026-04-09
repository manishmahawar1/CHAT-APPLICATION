import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js"
import dotenv from "dotenv"

dotenv.config()


const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith("token"))?.split("=")[1];

        if (!token) {
            console.log("Socket connection reject: No token provided")
            return next(new Error("Unauthorized - No Token provided"))
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            console.log("Socket connection rejected: Invalid Token");
            return next(new Error("Unauthorized - No Token provided"))

        }
        const user = await authModel.findById(decode.userId).select("-password");
        if (!user) {
            console.log("Socket connection rejected user not found");
            return next(new Error("User Not Found!"))
        }

        // atttach user info to socket
        socket.user = user;
        socket.userId = user._id.toString()

        console.log(`Socket authenticated for user-  Name: ${user.name} _id: (${user._id})`);


        next();
    } catch (error) {
        console.log("error in socket  authentication:", error);
        next(new Error("Unauthorized - Authentication failed!"))

    }
}


export default socketAuthMiddleware;