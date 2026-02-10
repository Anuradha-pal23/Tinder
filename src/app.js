const express=require('express');
const app=express();

// app.use("/",(req,res)=>{
//     res.send("hello");
// })

app.use("/hello",(req,res)=>{
    res.send("welocme to express")
});

app.use("/test",(req,res)=>{
    res.send("hellooooo.....")
});

app.listen(7000,()=>{
    console.log("server started at 70000...........")
});