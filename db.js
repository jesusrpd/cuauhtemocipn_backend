import mongoose from "mongoose";
import config from './utils/config.js';

export default async function connectDB(){
    try {
        await mongoose.connect(config.URI_DB, { dbName: config.DB_NAME});
        return console.log(`Database is connect ${config.URI_DB}`);
    } catch (error) {
        return console.log(error.message, 'Database is not connect');
    }
}