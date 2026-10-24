//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error);
        throw error;
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`the app is listening on ${process.env.PORT||8000}`);
    });
})
.catch((error)=>{
    console.log(`the connection failed: ${error}`);
})
/*
const app=express();
(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
       app.on("error",(error)=>{
        console.log(error);
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`the app is listening on ${process.env.PORT}`);
       });
    }
    catch(error){
        console.log(error);
        throw error;
    }
})()*/