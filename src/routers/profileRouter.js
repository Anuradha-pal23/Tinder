const express=require('express');
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validator")

profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {
    const user = req.user;
console.log(user)
    res.send(user);

  } catch (error) {
    console.log(error)
    res.status(401).send("invalid token");
  }
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
try {
    if(!validateEditProfileData(req.body)){
        throw new Error("invalid edit request");
        // res.status(400).send("invalid edit request");  
    }
    const loggedUser=req.user;
    console.log(loggedUser);

Object.keys(req.body).forEach((key)=>{
    loggedUser[key]=req.body[key];
});

await loggedUser.save();
res.send("profile updated successfully");
} catch (error) {
    res.status(400).send(error.message);
}
})



module.exports=profileRouter;
