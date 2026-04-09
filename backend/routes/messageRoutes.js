import express from "express"
import { getAllContact, getChatPartners, getMessagesByUserId, sendMessage } from "../controllers/messageController.js";
import authUser from "../middleware/authMiddleware.js";


const messageRouter = express.Router();

// messageRouter.use(authUser)

messageRouter.get("/contact", authUser, getAllContact);
messageRouter.get("/chats", authUser, getChatPartners);
messageRouter.get("/:id", authUser, getMessagesByUserId)
messageRouter.post("/send/:id", authUser, sendMessage)

export default messageRouter;