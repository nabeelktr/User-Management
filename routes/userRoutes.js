import express  from "express";
const router = express.Router()
import { authUser, registerUser } from "../controller/userController.js";







router.route('/register').post(registerUser)
router.route('/login').post(authUser)


//get
router.route('/signup').get((req,res)=>{ res.render('./signup')})
router.route('/').get((req,res)=>{ res.render('./login')})
router.route('/profile').get((req,res) => { res.render('./profile')})


export default router;