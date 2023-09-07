import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamp:true
}


)

userSchema.pre('save',async (next)=>{
    if(!this.isModified('password')){
        next()
    }
    const salt = await genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

const User = mongoose('User', userSchema)

export default User;