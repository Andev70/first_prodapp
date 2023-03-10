const express = require("express");
const expressFile = require("express-fileupload");
const router = express.Router();
const path = require("path");
const { getComments, createComment } = require("../controller/posts-comment");
const { createPoste } = require("../controller/post.control");

router.route("/").post(
  expressFile({
    debug: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../temp"),
  })
);
router.route("/comment").get(getComments).post(createComment);
module.exports = router;
