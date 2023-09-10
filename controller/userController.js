import asyncHandler from "express-async-handler"
import User from "../modals/userModal"
import generateToken from "../utils/generateToken";


const registerUser = asyncHandler(async(req,res) => {
    const {email,name,number,password} = req.body;

    const ifuser = await User.findOne({email : email})
    
    if(ifuser){

       return res.redirect('/?message= user already exists..')
    }else{
       const user = await User.create({
        name,
        email,
        number,
        password
       }) 

      return res.redirect('/')
    }
    
})

const authUser = asyncHandler(async(req,res) => {
    const {email,password}=req.body
    let user = await User.findOne({email:email})
    if(user && (await user.matchPassword(password) )){
       
        
        const token= generateToken(user._id)
        res.cookie('token',token)
        return res.redirect('/profile')

    }else{
       return res.redirect('/?message=Enter a valid Username or Password.')

    }

})

const getUserProfile = asyncHandler(async(req,res)=>{
    
    res.render('profile',req.user)
})
export {registerUser,authUser,getUserProfile}