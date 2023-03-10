const { Comment, Post } = require("../model/post.model");

// create post
const createComment = async (req, res) => {
  try {
    req.body.comment = "my comment";
    req.body.commenter_name = "jhon";
    req.body.post_ID = "640acf0c7fd0ba457e5aa8a9";

    const comment = await Comment.create(req.body);
    if (!comment) return res.status(500).json({ msg: "can't create" });
    const commentID = comment._id;
    const id = comment.post_ID;
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comments: commentID } }
    );
    if (!post) return res.json({ msg: "cannot add the comment" });
    res.status(200).json({ comment });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "error occured" });
  }
};
//get comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    if (!comments) return res.status(404).json({ msg: "not found" });
    res.status(200).json({ comments });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "error occured" });
  }
};

module.exports = { getComments, createComment };
