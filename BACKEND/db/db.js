// import mongoose from 'mongoose';

// function connectDB() {
//     mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log('MongoDB connected successfully');
//     })
//     .catch((err) => {
//         console.error('MongoDB connection error:', err);
//     });
// }

// export default connectDB;

import mongoose from "mongoose";

// import {DB_NAME} from '../constants.js';

import {DB_NAME} from '../constants.js';

const connectDB=async()=>{
    try{
        const connectionInstanse=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected !!! DB HOST: ${connectionInstanse.connection.host} `)
    }catch(error){
        console.log("MOngoDB connection error",error)
        process.exit(1)
    }
}

export default connectDB
