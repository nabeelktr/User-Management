import jwt from "jsonwebtoken";
import User from "../modals/userModal.js";
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
 
  if(req.cookies.token ) {
    try {
        token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id).select('-password')
        
        
        next()
    } catch (error) {
        console.log(error);
        res.status(401);
        return res.redirect('/?=invalid user');

    }
  }

  if (!token) {
    if(req.originalUrl.includes('/admin'))
    return res.redirect('/admin?=invalid user')
    else 
    return res.redirect('/?=invalid user');
    
  }
});

export { protect };