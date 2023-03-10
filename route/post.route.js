const express = require("express");
const expressFile = require("express-fileupload");
const router = express.Router();
const path = require("path");
const { getComments } = require("../controller/posts-comment");
const { createPost } = require("../controller/post.control");

router.route("/").post(
  expressFile({
    debug: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../temp"),
  }),
  createPost
);
router.route("/comment").get(getComments);
module.exports = router;
