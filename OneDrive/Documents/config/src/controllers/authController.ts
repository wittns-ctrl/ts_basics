import dotenv from 'dotenv'
dotenv.config()
import type{Request,Response} from "express";
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const signToken = (id:any):string =>{
    return jwt.sign({id},
        process.env.JWT_SECRET!,
        {expiresIn:'15m'})
}
// the signUp stage
export const register = async(req:Request,res:Response)=>{
    const {name,password,email,role} = req.body;
    try{
    const newUser = await User.create({name,email,password,role})

    const token = signToken(newUser._id);
    res.status(201).json({
        success:true,
        token,
        data : {user: newUser}

    })
}catch(error:any){
    res.status(400).json({Registration_error:error.message})
}
}

// the login state
export const login = async(req:Request,res:Response)=>{
    try{
   const {email,password} = req.body;
   if(!email || !password){
    return res.status(400).json({message:"missing credentials"})
   }
   const users = await User.findOne({email}).select("+password");

   if(!users || !(await users.comparePassword(password))){
    return res.status(401).json({message:"wrong credential ,please sign up again"})
   }

   const token = signToken(users._id);

    const userResponse = users.toObject();
    userResponse.password = " ";

    res.status(200).json({
        success:true,
        token,
        data :{user: users}
    })

    }catch(error:any){
     return res.status(500).json({login_error:error.message})
    }
}
