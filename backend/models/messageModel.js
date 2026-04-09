import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true
    },

    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true
    },
    text: {
        type: String,
        trim: true,
        maxLength: 2000
    },
    image: {
        type: String
    },
}, { timestamps: true }
)


const messageModel = mongoose.models.message || mongoose.model("message", messageSchema);

export default messageModel;

