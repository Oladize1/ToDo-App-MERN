import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        const conn = mongoose.connect(uri)
        console.log("database connected successfully")
    } catch (error) {
        console.log({message:"error connecting Database", error});
    }
}