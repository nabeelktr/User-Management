import asyncHandler from "express-async-handler"
import User from "../modals/userModal"

const registerUser = asyncHandler(async(req,res) => {
    const {email,name,password} = req.body;

    const user = await User.findOne({email : email})
    
    if(user){
        req.flash('message', "user exits..")
        res.render('/login')
    }else{
       const newUser = await User.create({
        name,
        email,
        password
       }) 

       res.render('/profile',newUser)
    }
})

const authUser = asyncHandler(async(req,res) => {
    res.render('./login')
})

export {registerUser,authUser}