import messageModel from "../models/messageModel.js"
import authModel from "../models/authModel.js"
import cloudinary from "../lib/cloudinary.js";
import { getreceiverSocketId, io } from "../lib/socket.js";


const getAllContact = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // console.log(loggedInUserId);

        const filterUser = await authModel.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(201).json({ success: true, filterUser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



const getMessagesByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const myId = req.user._id; // other user Id


        //  now here we take all meassages by me and other user //

        const messages = await messageModel.find({
            $or: [
                { senderId: myId, recieverId: id }, // i send meassages
                { senderId: id, recieverId: myId }  // other send me messages
            ]
        })

        res.status(200).json({ success: true, messages })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id } = req.params;
        const senderId = req.user._id;
        const recieverId = id;

        if (!text && !image) {
            return res.status(400).json({ success: false, message: "Text or image is required." })
        }

        if (senderId.equals(recieverId)) {
            return res.status(400).json({ success: false, message: "Cannot send messages to yourself." })
        }

        const recieverExists = await authModel.exists({ _id: recieverId });

        if (!recieverExists) {
            return res.status(404).json({ success: false, message: "Reciever not Found!" })
        }

        let imageUrl;
        if (image) {
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await messageModel.create({
            senderId,
            recieverId,
            text,
            image: imageUrl,
        })
        // send message in real time 
        const receiversoketId = getreceiverSocketId(recieverId);
        if (receiversoketId) {
            io.to(receiversoketId).emit("newMessage", newMessage)
        }

        res.status(201).json({ success: true, newMessage });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}




const getChatPartners = async (req, res) => {

    try {
        const loggedInUserId = req.user._id;

        // find all the messages where the logged-in user is either sender or reciever

        const meassages = await messageModel.find({
            $or: [
                { senderId: loggedInUserId },
                { recieverId: loggedInUserId }
            ]
        });

        const chatPartnerIds = [...new Set(meassages.map(msg =>
            msg.senderId.toString() === loggedInUserId.toString()
                ? msg.recieverId.toString()
                : msg.senderId.toString())
        )]


        const chatPartners = await authModel.find({
            _id: { $in: chatPartnerIds }
        }).select("-password")

        res.status(200).json({ success: true, chatPartners })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



export { getAllContact, getChatPartners, getMessagesByUserId, sendMessage }