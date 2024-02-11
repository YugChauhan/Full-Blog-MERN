const express = require("express");
const User = require("../Models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const NewUser = new User({ username, email, password: hashedPassword });
    const saveduser = await NewUser.save();
    res.status(200).json(saveduser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json("User not found");
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(401).json("Wrong credientials");
  }
  const token = jwt.sign(
    { _id:user._id, username:user.username, email:user.email },
    process.env.SECRET,
    { expiresIn: "3d" }
  );
  const { password, ...info } = user._doc;
  res.cookie("token", token).status(200).json(info);
});

//Log Out

router.get("/logout", (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

//Refetch

router.get("/refetch", (req, res) => {
  const Token = req.cookies.token;
  jwt.verify(Token, process.env.SECRET,{}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
