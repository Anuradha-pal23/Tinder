const express=require('express');
const { authAdmin, userAuth } = require('./middlewares/auth');
const app=express();


app.all("/admin",authAdmin)

app.get("/user",userAuth,(req,res)=>{
    res.send("user data")
})
app.get("/admin/getallDetails",(req,res)=>{
    res.send("admin got data");
})

app.post("/admin/Deleteuser",(req,res)=>{
    res.send(" admin data deleted");
})


app.listen(7000,()=>{
    console.log("server started at 70000...........")
});