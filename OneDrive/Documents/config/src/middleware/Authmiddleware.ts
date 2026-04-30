import dotenv from 'dotenv'
dotenv.config()
import type{Request,Response,NextFunction} from 'express'
import {User,UserRole} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const protect = async(req:Request,res:Response,next:NextFunction)=>{
let token;
 try{
 if(req.headers.authorization?.startsWith('Bearer')){
    token = req.headers.authorization.split("")[1]
 }
 if(!token){
    return res.status(401).json({message:"invalid token"})
 }

 if(!process.env.JWT_SECRET){
    return res.status(500).json({message:"JWT_SECRET token is missing"})
 }

 const decoded:any = jwt.verify(token,process.env.JWT_SECRET!);

 const currentUser = await User.findById(decoded.id)
if(!currentUser){
    res.status(401).json({message:"user no longer exists"})
}

(req as any).user = currentUser;

next()

 }catch(error:any){
 res.status(500).json({message:error.message})
 } 
}


export const restrictTo = (...roles:[UserRole])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const user = (req as any).user;

        if(!roles.includes(user.role)){
            res.status(403).json({
            status: 'fail',
            message: "you do not have access to perform this action"
            })
        }
        next()
    }
}