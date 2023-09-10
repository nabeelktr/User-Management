import express  from "express";
const router = express.Router()
import { authUser, getUserProfile, registerUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";





router.route('/').get((req,res)=>{ 
    if(req.cookies.token){
        res.redirect('/profile')
    }else{
    const message = req.query.message
    res.render('./login',{message: message})
    }
})


//post
router.route('/register').post(registerUser)
router.route('/login').post(authUser)

//get
router.route('/signup').get((req,res)=>{ res.render('./signup')})
router.route('/profile').get(protect, getUserProfile)
router.route('/logout').get((req,res)=>{ 
    res.clearCookie('token')
    res.redirect('/')
})





export default router;