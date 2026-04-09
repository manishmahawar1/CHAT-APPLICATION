import mongoose from "mongoose";

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