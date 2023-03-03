const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  useremail:{type:String,required:[true,'need your email']},
  userID: {
    type: String,
    required: [
      true,
      "user id is not found, whithout user id we can't identify the user",
    ],
    unique: [true,"user auth faild"],
  },
  username: {
    type: String,
    required: [true, "please provide a stage name"],
    trim: true,
  },
  pic: {
    type: String,
    default: "./upload/IMG-20230207-WA0001.jpg",
  },
  bio: {
    type: String,
    maxlength: [60, "bio should be short and sweet"],
    trim: true,
  },
  friends: { type: Array, default: ["anupal"] },
  website:{
    type:String
  }
});

module.exports = mongoose.model("profiles", profileSchema);
