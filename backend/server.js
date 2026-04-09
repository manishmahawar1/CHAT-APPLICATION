import cookieParser from 'cookie-parser';
import express from 'express';
import http from "http"
import dotenv from "dotenv"
import connectDB from './config/database.js';
import authRouter from './routes/authRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import cors from "cors"
import { app, server } from './lib/socket.js';


dotenv.config();

// const app = express();
connectDB();
//middleware
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


app.get("/", (req, res) => {
    res.send("hello")
})


//end-points
app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);

})