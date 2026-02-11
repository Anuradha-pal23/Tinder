const express=require('express');
const app=express();

app.get('/user/:userId/:userName/:password',(req,res)=>{
    console.log(req.params);
    res.send("Anuradha pal")
});

app.post("/user",(req,res)=>{
    res.send("data created sucessfully");
});

app.delete("/user",(req,res)=>{
    res.send("data deleted...")
})
app.listen(7000,()=>{
    console.log("server started at 70000...........")
});