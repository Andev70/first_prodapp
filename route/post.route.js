const express = require("express");
const expressFile = require("express-fileupload");
const router = express.Router();
const path = require("path");
const { createPost } = require("../controller/post.control");

router.route("/").post(
  expressFile({
    debug: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../temp"),
  }),
  createPost
);
module.exports = router;
