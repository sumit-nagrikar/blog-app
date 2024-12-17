import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://sumitnagrikar:sumit123@cluster0.polku.mongodb.net/Blog-app');
    console.log("DB connected");
}