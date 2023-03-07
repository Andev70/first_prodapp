const express = require("express");
const expressFile = require("express-fileupload");
const router = express.Router();
const path = require("path");
const { addPost } = require("../controller/post.control");

router.route("/").get(addPost);

module.exports = router;