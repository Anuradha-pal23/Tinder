const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userId:{
        type:String,      
        //   required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!emailRegex.test(value)){
                throw new Error("email is not valid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value.length<6){
                throw new Error("password must be atleast 6 character");
            }
        }
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<18){
                throw new Error("age must be atleast 18");
                
            }
        }
    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","female","other"].includes(value.toLowerCase())){
                throw new Error("gender is not valid");
        }
    }
}
},
{
    timestamps:true,
    
})
const users=mongoose.model("User",userSchema);
module.exports=users;