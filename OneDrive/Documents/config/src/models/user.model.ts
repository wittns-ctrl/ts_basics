import {Schema,model,Document} from 'mongoose';
import bcrypt from "bcrypt";

export enum UserRole{
    ADMIN='admin',
    STAFF='staff',
    USER='user'
}

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    role:UserRole;
    isVerified:boolean;
    comparePassword(password:string):Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole),
        default: UserRole.USER
    },
    isVerified: {
        type: Boolean,
        default: false
    },
},
{timestamps:true})
userSchema.pre('save',async function(){
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password,12)
})

userSchema.methods.comparePassword = async function (enteredPassword:string): Promise<boolean>{
    return await bcrypt.compare(enteredPassword,this.password);
}

export const User = model<IUser>('user',userSchema);