const express = require("express");

//controllers
const { createNewComment } = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post(
  "/articles/:article_id/comments",
  authentication,
  authorization("CREATE_COMMENT"),
  createNewComment
);

module.exports = commentsRouter;
