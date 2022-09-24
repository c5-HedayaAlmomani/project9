const connection = require("../models/db");

const createNewComment = (req, res) => {
  const article_id = req.params.article_id;
  const commenter_id = req.token.userId;

  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter_id, article_id) VALUES (?,?,?)`;
  const data = [comment, commenter_id, article_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      result: result,
    });
  });
};

module.exports = {
  createNewComment,
};
