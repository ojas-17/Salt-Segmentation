import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // console.log(connectionInstance);
        console.log(`\n Connected to MongoDB!! DB HOST : ${connectionInstance.connection.host} \n`);
    }catch(error){
        console.log("Error in connection  : ", error?.message);
        throw error;
    }
}

export default connectDB;