const mongoose=require('mongoose');
const connectionRequestSchema=new mongoose.Schema({
    fromUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps:true,
}
);

connectionRequestSchema.index({fromUserID:1,toUserID:1},{unique:true});

// connectionRequestSchema.pre("save",function(next){
//     const connectionRequest=this;
//     // check whether the sender of the request is same as user (yourself)
//     if(connectionRequest.fromUserID.equals(connectionRequest.toUserID)){
//         throw new Error("cannot send request to yourself");
//     }
//     next();
// })


const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequestModel;