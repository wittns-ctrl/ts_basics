import mongoose, {Schema,model,Document} from 'mongoose';
import {User} from './user.model.js'

export  interface IEvent extends Document{
  title: String;
  description: String;
  location: String;
  date:Date;
  price: number;
  banner: string;
  organizer: mongoose.Types.ObjectId;
}

const EventSchema = new Schema<IEvent>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
   price:{
    type: Number,
    required:true
   },
   banner:{
    type:String,
    required: true
   },
   organizer:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required: true
   }  
})

export const Event = model<IEvent> ('event',EventSchema)