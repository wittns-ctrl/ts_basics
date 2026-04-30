import type{Request,Response} from 'express'
import {Event} from '../models/Events.model.js'

export const EventPlanning = async(req:Request,res:Response)=>{
    try{
  
const currentuser = (req as any).user

const eventData = {
    ...req.body,
    organizer: currentuser?._id
  }

  const newUser = await Event.create(eventData)

  res.status(201).json({
  status:'sucesss',
  data: newUser
  })
    }catch(error:any){

        return res.status(400).json({error_msg:error.message})
    }
}