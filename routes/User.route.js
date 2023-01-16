const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User.model");
const userRouter = express.Router();
require("dotenv").config();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    console.log({ err: err });
  }
});
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;

  try {
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, gender, password: hash });
        await user.save();
        res.send("Registration Successful");
      }
    });
  } catch (err) {
    console.log({ err: err });
    res.send("Error While Registering the user.");
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    console.log(user)
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          console.log({ "msg": "Logged In Success", "token": token });
          res.send({ "msg": "Logged In Success", "token": token });
        } else {
          res.send("Wrong Credentials.");
        }
      });
    } else {
      res.send("Error while logging..");
      console.log({ err: err });
    }
  } catch (err) {
    console.log({ err: err });
    res.send("Error While Registering the user.");
  }
});

module.exports = {
  userRouter,
};
