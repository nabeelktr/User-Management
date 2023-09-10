import User from "../modals/userModal";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";

const authAdmin = asyncHandler(async(req,res) => {
    const {email,password}=req.body
    const user = await User.findOne({email:email})
  
    if(user && user.__v == 1 && (await user.matchPassword(password) )){
       
        
        const token= generateToken(user._id)
        res.cookie('token',token)
        return res.redirect('/admin/profile')

    }else{
       return res.redirect('/admin/?message=Enter a valid Username or Password.')

    }

})

const adminPanel = asyncHandler(async (req,res)=>{
    const users = await User.find().lean()
    res.render('adminPanel',{users : users})
   
})

const searchUser = asyncHandler(async (req,res)=>{
    
    const users = await User.find({name : {$regex: new RegExp(req.body.name, 'i')}}).lean()
    
    if(users[0] != null){
    
    res.render('adminPanel',{users :users})
    }else{
        res.render('adminPanel',{msg : "no user found..."})
        }

   
})

const getUser = asyncHandler(async (req,res)=>{
    const id =req.params.id
    const user = await User.findOne({_id :Object(id) }).select('-password')
    
    if(user){

    res.json(user)
    }
    
})

const upadateUser =asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        user.name=req.body.name
        user.email=req.body.email
        user.number=req.body.number
    }
    if (req.body.password){

    user.password = req.body.password
    }
    await user.save()
    
    return res.redirect('/admin/profile')

})
const Delete = asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id)
    
    await user.deleteOne({_id : user._id})
    return res.redirect('/admin/profile')
})

export {authAdmin,adminPanel,searchUser,getUser,upadateUser,Delete}