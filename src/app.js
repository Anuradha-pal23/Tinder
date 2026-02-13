const express=require('express');
const { authAdmin, userAuth } = require('./middlewares/auth');
const app=express();
const connectDb=require('./config/ConnectDb');
const User=require("./models/users")

app.post("/signup",async(req,res)=>{
const user=new User({
    firstName:"Anuradha",
    lastName:"pal",
    emailId:"anu@gmail.com",
    password:"anu123",
    
})

try {
     await user.save();
 res.send("user created successfully");
}
 catch (error) {
    res.status(400).send("something wrong");
    console.log("something went wrong.....");
}
});


connectDb().
then(()=>{
    console.log("database connected")
    app.listen(7000,()=>{
    console.log("server started at 70000...........")
});
}).
catch((error)=>{
    console.log("database not connnected")
});
