import asyncHandler from "express-async-handler"
import User from "../modals/userModal"


const registerUser = asyncHandler(async(req,res) => {
    const {email,name,number,password} = req.body;

    const ifuser = await User.findOne({email : email})
    
    if(ifuser){

        res.render('login')
    }else{
       const user = await User.create({
        name,
        email,
        number,
        password
       }) 

       res.render('profile',{user})
    }
    
})

const authUser = asyncHandler(async(req,res) => {
    const {email,password}=req.body
    let user = await User.findOne({email:email})
    if(user && (await user.matchPassword(password) )){
       
        
        res.render('profile',user)

    }else{
        res.render('login')

    }

})

export {registerUser,authUser}