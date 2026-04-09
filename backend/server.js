import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

import { initSocket } from "./lib/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ---------------- DB CONNECTION ----------------
connectDB();

// ---------------- MIDDLEWARE ----------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS (Production ready)
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL
    ],
    credentials: true
}));

// ---------------- ROUTES ----------------
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// ---------------- TEST ROUTE ----------------
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// ---------------- SOCKET INIT ----------------
initSocket(server);

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});