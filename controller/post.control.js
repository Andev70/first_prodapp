const Post = require("../model/post.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();
const {
  profilePictureUpload,
} = require("../middleware/upload-files/couldinary-uploads");
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.files);
    const auth_ID = req.headers.authorization;
    if (!auth_ID) return res.status(401).json({ msg: "un authorized user" });
    const jwt_token = jwt.verify(auth_ID, process.env.JWT_SECRET);
    const user_ID = jwt_token.id;
    req.body.userID = user_ID;
    const post = await Post.create(req.body);
    if (!post) return res.status(500).json({ msg: "cannot post" });
    const postID = post._id;
    const check = await Post.findOne({ _id: postID });
    //  file uploading

    const files = req.files;

    if (files) {
      const profilePicture = Object.values(files)[0];
      cloudinary.uploader.upload(
        profilePicture.tempFilePath,
        {
          folder: "profile",
        },
        async (err, image) => {
          if (err) {
            fs.unlink(profilePicture.tempFilePath, (error) => {});
            console.log(err);
          }
          // if uploaded
          const img = image.url;
          // console.log(img);

          const profileImg = await Post.findOneAndUpdate(
            { _id: postID },
            { picture: img }
          );
          fs.unlink(profilePicture.tempFilePath, (error) => {
            if (error) console.log(error);
          });
        }
      );
    }
    //  fully uploaded

    res.status(201).json({ msg: "posted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "error occured" });
  }
};

module.exports = { createPost };
