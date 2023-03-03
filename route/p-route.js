const express = require("express");
const expressFile = require("express-fileupload");
const router = express.Router();
const path = require("path");
const {
  getSingleProfile,
  createProfile,
  getAllProfiles,
} = require("../controller/p-control");

router
  .route("/")
  .post(
    expressFile({
      debug: true,
      useTempFiles: true,
      tempFileDir: path.join(__dirname, "../temp"),
    }),
    createProfile
  )
  .get(getAllProfiles);
router.route("/profile").get(getSingleProfile);
module.exports = router;
