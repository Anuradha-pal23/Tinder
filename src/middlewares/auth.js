const jwt=require('jsonwebtoken');
const User=require('../models/users')

const userAuth= async(req,res,next)=>{
    try {
        const {token}=req.cookies;

        if(!token){
            throw new Error("Token is not valid");
        }

        const decodeObj=await jwt.verify(token,"secretkey");

        const {userId}=decodeObj;

        const user= await User.findById(userId);
        if(!user){
            throw new Error("user not found")
        }
        req.user=user;
        next();
    } catch (error) {
        res.status(400).send("something went wrong")
    }

}

module.exports={
    userAuth,
}