const authAdmin=(req,res,next)=>{
const token="xyz";
const isAuthorized=token==="xyz";
if(isAuthorized){
    next();
    console.log("admin authorized");
}
else{
    res.status(401).send("unauthorized admin")
}
}

const userAuth=(req,res,next)=>{
    const token="xyz";
    const isAuthorized=token==="xyz";
    if(!isAuthorized){
        res.status(401).send("unAuthorized user");
    }
    console.log("user authorized");
    next();
}

module.exports={
    authAdmin,
    userAuth,
}