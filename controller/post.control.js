const Post = require("../model/post.model.js");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const addPost = async (req, res) => {
  try {
    const post = await Post.create({
      user_pic: "jdjddj",
      userID: "ssjjjs",
      username: "jsdjssj",
    });

    if (!post) return res.status(500).json({ msg: "cannot create post" });
    res.status(201).json({ msg: "post created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "error occured" });
  }
};

module.exports = { addPost };
