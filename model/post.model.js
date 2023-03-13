const mongoose = require("mongoose");

const moment = require("moment-timezone");
// comment schema for better performence
const commentSchema = new mongoose.Schema({
  post_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: [true, "post id is required"],
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user reference  is needed"],
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
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [
      { name: "likes", value: 0 },
      { name: "happy", value: 0 },
      { name: "angry", value: 0 },
      { name: "sad", value: 0 },
      { name: "heart", value: 0 },
    ],
  },
  comments: [commentSchema],
  share: { type: Number, default: 0 },
  visivility_status: { type: String, default: "public" },
});
// adding index for quering
postSchema.index({ userID: 1 });
// set schemas
const Post = mongoose.model("posts", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Post, Comment };
