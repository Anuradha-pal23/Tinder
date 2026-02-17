const express = require('express');
const { authAdmin,userAuth } = require('./middlewares/auth');
const app = express();
const connectDb = require('./config/ConnectDb');
const User = require("./models/users");
const validate = require('./utils/validator');
const bcrypt = require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routers/authRouter");
const profileRouter=require("./routers/profileRouter");
const requestRouter=require("./routers/requestRouter");

app.use("/",authRouter,profileRouter,requestRouter);





// ================= DB CONNECTION =================

connectDb()
  .then(() => {
    console.log("database connected");
    app.listen(7000, () => {
      console.log("server started at 7000...........");
    });
  })
  .catch(() => {
    console.log("database not connected");
  });
