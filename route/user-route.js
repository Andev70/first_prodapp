const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUserInfo,
  verifyUser,
  resendVerifyOtp,
  resetPassOtp,
  checkResetPassOtp,
  renewPassword,
} = require("../controller/control.js");

// routes are declaire
router.route("/otp/check").post(checkResetPassOtp);
router.route("/signup").post(signup);
router.route("/verify").post(verifyUser);
router.route("/login").post(login);
router.route("/").post(getUserInfo);
router.route("/resendotp").patch(resendVerifyOtp);
router.route("/reset").post(resetPassOtp);
router.route("/new/password").post(renewPassword)
// exports
module.exports = router;
