import mongoose from 'mongoose';
import {DB_name} from '../constants.js';

const connectDB=async()=>{
    try{
    const connectInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
    console.log(`MONGODB connected!! dbHOST :${connectInstance.connection.host}`);
    }
    catch(error){
        console.log(`MONGODB not connected ${error}`);
        process.exit(1)
    }
}
export default connectDB;