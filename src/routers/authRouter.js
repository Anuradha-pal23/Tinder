const express=require('express');
const authRouter=express.Router();
const User = require("../models/users");
const validate=require("../utils/validator")
const bcrypt=require('bcrypt')

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, skills } = req.body;

    // check existing email
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // validate data (it throws error if invalid)
    validate(req.body);

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
    const token = await user.getJWT();

    // send token in cookie
    res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
    res.send("login successful");

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports=authRouter;