const Comment = require("../models/comment.model");

const ADD_COMMENT = async (req, res) => {
  let { postId, userId } = JSON.parse(req.params.id);
  const userComment = new Comment({
    postId: postId,
    createdBy: userId,
    name: req.body.name,
    question: req.body.question,
  });
  console.log(userComment);
  userComment
    .save()
    .then(() => {
      res.json("comment is added");
    })
    .catch((err) => res.status(400).json("error" + err));
};

const ANS_COMMENT = async (req, res) => {
  var data = {
    answer: req.body.answer,
    isAnswered: true,
  };
  Comment.findOneAndUpdate({ _id: req.params.id }, data).then((res) => {
    res.json("Comment answered successfully");
  });
  console.log("comment is answered");
};

const LOAD_COMMENT = async (req, res) => {
  Comment.find({ postId: req.params.id }).then((data) => {
    return res.json(data);
  });
};

module.exports = { ADD_COMMENT, ANS_COMMENT , LOAD_COMMENT};
