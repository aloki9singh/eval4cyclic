const express = require("express");

const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.route");
const { authenticate } = require("./Middleware/authenticate.middleware");
const { postRouter } = require("./routes/Post.route");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.get("/", (req, res) => {
  res.send("Welcome to Social Media App");
});

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)
app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to Database.");
  } catch (err) {
    console.log({ err: err });
  }

  console.log("Social App Server is running...");
});
