const mongoose = require("mongoose");
const moment = require("moment-timezone");
const postSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [
      true,
      "user id is not found, whithout user id we can't identify the user",
    ],
    unique: [true, "user auth faild"],
  },

  posted_at: {
    type: Date,
    default: moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm:ss a"),
  },

  caption: {
    type: String,
    maxlength: [70, "caption should be short and sweet "],
    trim: true,
  },
  picture: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },

  hearts: {
    type: Number,
    default: 0,
  },
  smiley: {
    type: Number,
    default: 0,
  },
  sad: {
    type: Number,
    default: 0,
  },

  angry: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [
      {
        comment: "you are a nice person",
        time_stamp: "02-03-2023",
        likes: 0,
        reply: [],
      },
    ],
  },
  share: { type: Number, default: 0 },
  username: {
    type: String,
    required: [true, "username  is required"],
    trim: true,
  },
  user_pic: { type: String, required: [true, "profile pic is required"] },
});

module.exports = mongoose.model("posts", postSchema);
