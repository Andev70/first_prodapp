const mongoose = require("mongoose");
const moment = require("moment-timezone");
const postSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [
      true,
      "user id is not found, whithout user id we can't identify the user",
    ],
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
    default: "empty",
  },
  reactions: {
    type: Array,
    default: [
      {
        name: "likes",
        value: 0,
      },

      {
        name: "happy",
        value: 0,
      },
      {
        name: "angry",
        value: 0,
      },
      {
        name: "sad",
        value: 0,
      },

      {
        name: "heart",
        value: 0,
      },
    ],
  },
  comments: {
    type: Array,
    default: [
      {
        commenter_name: "empty",
        commenter_pic: "empty",
        comment: "empty",
        time_stamp: "02-03-2023",
        comment_likes: 0,
        comment_reply: ["empty"],
      },
    ],
  },
  share: { type: Number, default: 0 },
  username: {
    type: String,
    required: [true, "username  is required"],
    trim: true,
  },
  visivility_status: { type: String, default: "public" },
  user_pic: { type: String, required: [true, "profile pic is required"] },
});

module.exports = mongoose.model("posts", postSchema);
