const express = require("express");
const { PostModel } = require("../model/Post.model");

const postRouter = express.Router();
require("dotenv").config();
postRouter.use(express.json());

postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (err) {
    console.log({ err: err });
  }
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const post = new PostModel(payload);
    await post.save();
    res.send("Post Successful");
  } catch (err) {
    console.log({ err: err });
    res.send("Error while posting...");
  }
});

postRouter.post("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await PostModel.find({ _id: id });
  console.log(post);
  const postid = post[0].userID;
  const postreqid = req.body.userID;

  try {
    if (postid !== postreqid) {
      res.send({ err: "You are not Authorised" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated the post...");
    }
  } catch (err) {
    console.log({ err: err });
    res.send("Error while post Updating...");
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send("Deleted the post...");
  } catch (err) {
    console.log({ err: err });
    res.send("Error while post Deleting...");
  }
});

module.exports = {
  postRouter,
};
