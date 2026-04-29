import mongoose from 'mongoose'
import env from './env.js'

export const connectDB=async()=>{
try{
await mongoose.connect(env.MONGO_URI)
console.log("mongodb connnected sucessfully")
}catch(error:any){
    console.error("connection failded",error.message)
    process.exit(1);
}
}
export default connectDB;

