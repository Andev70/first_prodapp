const Post = require("../model/post.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const auth_ID = req.headers.authorization;
    if (!auth_ID) return res.status(401).json({ msg: "un authorized user" });
    const jwt_token = jwt.verify(auth_ID, process.env.JWT_SECRET);
    const user_ID = jwt_token.id;
    req.body.userID = user_ID;
    const post = await Post.create(req.body);
    if (!post) return res.status(500).json({ msg: "cannot post" });
    res.status(201).json({ msg: "posted", post });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "error occured" });
  }
};

module.exports = { createPost };
