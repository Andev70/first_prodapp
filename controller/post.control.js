const Post = require("../model/post.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const addPost = async (req, res) => {
  try {
    const posts = await Post.create({
      userID: "jffdn",
      username: "hdfhdhdj",
      user_pic: "dkddk",
    });
    if (!posts) return res.status(401).json({ msg: "cannot create post" });

    res.status(201).json({ msg: ["post created successfully", posts] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "error occured" });
  }
};

module.exports = { addPost };
