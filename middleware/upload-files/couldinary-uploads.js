const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//////////
const profilePictureUpload = (request, user, collection) => {
  const files = request.files;

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
        console.log(img);

        const profileImg = await collection.findOneAndUpdate(
          { userID: user },
          { pic: img }
        );
        fs.unlink(profilePicture.tempFilePath, (error) => {});
      }
    );
  }
};
//////////

module.exports = { profilePictureUpload };
