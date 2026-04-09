import mongoose from "mongoose";
import dotenv from "dotenv"
 dotenv.config()

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}`);
        if (connection) {
            console.log("MongoDb Connected");
        }

    } catch (error) {
        console.log(error);

    }

}

export default connectDB;