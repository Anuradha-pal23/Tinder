const express=require('express');
const authRouter=express.Router();
const User = require("../models/users");
const {validateSignUp}=require("../utils/validator")
const bcrypt=require('bcrypt');
const { userAuth } = require('../middlewares/auth');
const jwt=require("jsonwebtoken");



authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, skills } = req.body;

    // check existing email
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // validate data (it throws error if invalid)
    validateSignUp(req.body);

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      skills,
      gender:req.body.gender,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: savedUser,
    });

  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordValidate = await user.validatePassword(password);

    if (!passwordValidate) {
      throw new Error("Invalid credentials");
    }

    // create JWT token
    const token = jwt.sign({userId:user._id},"secretkey",{expiresIn:"2hrs"});

    // send token in cookie
    res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
    res.send("login successful");

  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/logout",userAuth,(req,res)=>{
    // res.cookie("token",null,{expires:new Date(Date.now())}); or this ⬇️
    res.clearCookie();
    res.send("logout successfull") 
});

authRouter.post("/forgot-password", async (req, res) => {
  try {
    const { emailId } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("User not found");
    }

    // create reset token
    const token = jwt.sign({ _id: user._id }, "secretkey", {
      expiresIn: "10h",
    });
    //  console.log(token);

    // In real app → send email
    res.send({
      message: "Reset link generated",
      resetLink: `http://localhost:7000/reset-password/${token}`,
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.patch("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    // verify token
    const decoded = jwt.verify(req.params.token, "secretkey");

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("User not found");
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.send("Password reset successful");

  } catch (error) {
    res.status(400).send("Invalid or expired token");
  }
});


module.exports=authRouter;