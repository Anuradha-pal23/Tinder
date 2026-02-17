const express=require('express');
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")

profileRouter.get("/profile",userAuth, async (req, res) => {
  try {
    const user = req.user;
console.log(user)
    res.send(user);

  } catch (error) {
    console.log(error)
    res.status(401).send("invalid token");
  }
});

module.exports=profileRouter;
