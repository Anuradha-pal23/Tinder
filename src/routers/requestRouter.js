const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require('../models/connectionRequest');
const users = require('../models/users');

requestRouter.post("/requests/send/:status/:toUserID",userAuth,async(req,res)=>{
try {
  const fromUserID=req.user._id;
  const toUserID=req.params.toUserID;
  const status=req.params.status;

  const allowedStatus=["ignored","interested"];
  if(!allowedStatus.includes(status)){
    return res.status(400).send("invalid status type "+status);
  }

  const exisitingRequest=await ConnectionRequest.findOne({
    $or:[
      {fromUserID,toUserID},
      {fromUserID:toUserID,toUserID:fromUserID},
    ],
  })
  if(exisitingRequest){
    return res.status(400).send("connection already exists");
  }

  const user=await users.findById(toUserID);
  if(!user){
    return res.status(404).send("user not found");
  }

const connectionRequest=new ConnectionRequest({
  fromUserID,
  toUserID,
  status,
})

const data=await connectionRequest.save();
res.json({
  message:req.user.firstName+" is "+status+" "+user.firstName,
  data,
});
} catch (error) {
  res.status(400).send("error");
}
})

module.exports=requestRouter;