import authModel from "../models/authModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendWelcomeEmail from "../emails/nodeEmailHandler.js"
import cloudinary from "../lib/cloudinary.js"
import dotenv from 'dotenv'

dotenv.config()
// import  sendWelcomeEmail  from "../emails/emailHandler.js"


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existsUser = await authModel.findOne({ email });

        if (existsUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email) || !email.endsWith("@gmail.com")) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await authModel.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days ins Millisecons
            httpOnly: true, //prevent XSS attacks: cross-site scripting
            sameSite: "lax", // CSRF attacks
            path: "/",
            secure: process.env.NODE_ENV === "development" ? false : true,
        });



        // await sendWelcomeEmail(user.email, user.name, process.env.CLIENT_URL);
        try {
            await sendWelcomeEmail(user.email, user.name, process.env.CLIENT_URL);

        } catch (error) {
            console.error("Failed to send welcome email")
        }

        res.status(201).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Fields are required!" })
    }
    try {
        const user = await authModel.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials!" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: isProduction ? "None" : "Lax",
            secure: isProduction,
            path: "/"
        });

        res.status(200).json({ success: true, message: "user Login Successfully.", user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
}

const logout = (req, res) => {

    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: isProduction ? "None" : "Lax",
        secure: isProduction,
    });

    res.status(200).json({ success: true, message: "User Logout." })


}


const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;

        const userId = req.user._id
        if (!profilePic) {
            return res.status(400).json({ success: false, message: "Profile pic is required" })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await authModel.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url
        }, { new: true })

        res.status(200).json({ success: true, message: "Profile Updated.", updatedUser })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



export { signup, login, logout, updateProfile }