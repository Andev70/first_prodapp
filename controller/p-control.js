const Profile = require("../model/p-model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  profilePictureUpload,
} = require("../middleware/upload-files/couldinary-uploads");
// create profile

const createProfile = async (req, res) => {
  try {
    const authId = req.headers.authorization;

    if (!authId) res.status(401).json({ msg: "user auth failed" });
    const jwtcode = jwt.verify(authId, process.env.JWT_SECRET);
    const clientEmail = jwtcode.userDatabaseEmail;
    const id = jwtcode.userDatabaseID;
    const isPrestent = await Profile.findOne({ userID: id });
    if (isPrestent) {
      return res.status(500).json({ msg: "profile already present" });
    }
    const ifExistsEmail = await Profile.findOne({ useremail: clientEmail });
    if (ifExistsEmail)
      return res.status(201).json({ msg: "profile already present" });
    const user = req.body.username;
    req.body.userID = id;
    req.body.useremail = clientEmail;
    console.log(req.body);
    // creating profile without images
    const profile = await Profile.create(req.body);
    profilePictureUpload(req, id, Profile);
    // profile sucess fully created
    res.status(201).json("profile created");
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ msg: [" error occurred", "profile is not ready try again"] });
  }
};

//  get all the profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.status(200).json({ profiles });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error occured" });
  }
};

// get single profile by id
const getSingleProfile = async (req, res) => {
  try {
    const authID = req.headers.authorization;
    if (!authID) return res.status(401).json({ msg: "authorization failed" });

    const userToken = jwt.verify(authID, process.env.JWT_SECRET);
    const userID = userToken.id;
    const profile = await Profile.findOne({ userID: userID });
    if (!profile) return res.status(404).json({ msg: "no user found" });
    res.status(200).json({ profile });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "error occured" });
  }
};
module.exports = { createProfile, getAllProfiles, getSingleProfile };
