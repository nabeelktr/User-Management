import  express  from "express";
import { adminPanel, authAdmin,  searchUser } from "../controller/adminController";
import { protect } from "../middleware/authMiddleware";
var router = express.Router()


router.get('/',(req,res)=>{
    
    if(req.cookies.token){
        res.redirect('/admin/profile')
    }else{
        
        res.render('adminLogin')
    }
})

router.route('/login').post(authAdmin)

router.route('/profile').get(protect,adminPanel)

router.route('/logout').get((req,res)=>{
    res.clearCookie('token')
    res.redirect('/admin')
})

router.route('/searchUser').post(protect,searchUser)

export default router;
