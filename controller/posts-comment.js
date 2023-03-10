const { Comment } = require("../model/post.model");

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

module.exports = { getComments };
