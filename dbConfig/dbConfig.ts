import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE!, {
            connectTimeoutMS: 30000, // 30 seconds timeout
            socketTimeoutMS: 45000  // 45 seconds timeout
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB Connected');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
        });

        connection.on('disconnected', () => {
            console.log('MongoDB Disconnected');
        });
    } catch (error) {
        console.log("Something went wrong in connecting to DB");
        console.log(error);
    }
}
