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


// ================= SIGNUP =================

app.post("/signup", async (req, res) => {
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

//====================user login====================

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordValidate = await bcrypt.compare(password, user.password);

    if (!passwordValidate) {
      throw new Error("Invalid credentials");
    }

    // create JWT token
    const token = jwt.sign({ userId: user._id }, "secretkey",{expiresIn:"1d"});

    // send token in cookie
    res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
    res.send("login successful");

  } catch (error) {
    res.status(400).send(error.message);
  }
});


//==================== profile ==========================
app.get("/profile",userAuth, async (req, res) => {
  try {
    const user = req.user;
console.log(user)
    res.send(user);

  } catch (error) {
    console.log(error)
    res.status(401).send("invalid token");
  }
});

app.post("/sendConnectionrequest",userAuth,async(req,res)=>{
  const user=req.user;
  res.send(user.firstName  +""+"connection sent successfully")
})
// ================= GET USER BY EMAIL =================

app.get("/user", async (req, res) => {
  const userEmail = req.query.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });

    if (!user) {
      return res.status(404).send("user not found");
    }

    res.send(user);

  } catch (error) {
    res.status(400).send(error.message);
  }
});


// ================= DELETE USER =================

app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// ================= UPDATE USER =================

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {

    // ❌ prevent email update
    if (data.emailId) {
      return res.status(400).send("Email cannot be updated");
    }

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(user);
    res.send("user updated successfully");

  } catch (error) {
    res.status(400).send(error.message);
  }
});


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
