import jwt from "jsonwebtoken"
import authModel from "../models/authModel.js";

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        // console.log(token);

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - Login First!!" })
        }

        const token_deocded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await authModel.findById(token_deocded.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found!" })
        }
        // req.userId = token_deocded.userId;
        req.user = user;

        next();

    } catch (error) {
        res.status(501).json({ success: false, message: error.message })
    }
}


export default authUser;