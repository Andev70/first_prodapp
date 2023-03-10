const mongoose = require("mongoose");
const moment = require("moment-timezone");
// comment schema for better performence
const commentSchema = new mongoose.Schema({
  commenter_name: {
    type: String,
    required: [true, "your name is not provided"],
    trim: true,
  },
  commenter_pic: {
    type: String,
    default: "empty",
  },

  comment: { type: String, required: [true, "comment is empty"] },
  time_stamp: { type: Date, default: Date.now() },
  comment_likes: { type: Number, default: 0 },
  comment_reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
});

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
    default: Date.now(),
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
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  share: { type: Number, default: 0 },
  username: {
    type: String,
    required: [true, "username  is required"],
    trim: true,
  },
  visivility_status: { type: String, default: "public" },
  user_pic: { type: String, required: [true, "profile pic is required"] },
});
// adding index for quering
postSchema.index({ userID: 1 });
// set schemas
const Post = mongoose.model("posts", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Post, Comment };
