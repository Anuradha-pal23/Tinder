const { default: mongoose } = require('mongoose');
const db=require('mongoose');

const connectDb=async()=>{
    mongoose.connect("mongodb://localhost:27017/")
}


module.exports=connectDb;

