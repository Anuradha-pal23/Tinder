const express=require('express');
const app=express();

app.get("/user",(req,res,next)=>{
    console.log("handler router 1")
    // next();
    // res.send("response!!");
    next();
},
[(req,res,next)=>{
console.log("router handler 2")
next();
// res.send("2nd handler");
},
(req,res,next)=>{
    console.log("3rd handler");
    // res.send("3rd handler")
    next();
}],
(req,res,next)=>{
    console.log("4th route");
    next();
    res.send("4th handler")
})
app.listen(7000,()=>{
    console.log("server started at 70000...........")
});