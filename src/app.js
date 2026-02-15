const express=require('express');
const { authAdmin, userAuth } = require('./middlewares/auth');
const app=express();
const connectDb=require('./config/ConnectDb');
const User=require("./models/users")

app.use(express.json()) 

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json({
      message: "user created successfully",
      data: savedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("something went wrong");
  }
});



//get user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;

    try {
        console.log(userEmail);
        const user=await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send("user not found")
        }
        else{
            res.send(user)
        }
    } catch (error) {
          res.status(400).send("something wrong");
    }
})

//delete by id
app.delete("/user/:id",async(req,res)=>{
const userId=req.params.id;
try {
    const user=await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
} catch (error) {
    res.status(404).send("something went wrong");
}
})

//update data by user
app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try {
        const user=await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true,
        });
        console.log(user);
        res.send("user updated successfully");
}
catch(error){
    res.status(400).send("something went wrong");
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
