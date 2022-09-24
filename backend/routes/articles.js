const express = require("express");
const {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
  getCommentById
} = require("../controllers/articles");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);
articlesRouter.get("/search_1", getArticlesByAuthor);
articlesRouter.get("/search_2/", getArticleById);
articlesRouter.get("/comments/:article_id", getCommentById);

articlesRouter.post(
  "/",
  authentication,
  authorization("CREATE_ARTICLE"),
  createNewArticle
);
articlesRouter.put("/:id", updateArticleById);
articlesRouter.delete("/", deleteArticlesByAuthor);
articlesRouter.delete("/:id", deleteArticleById);

module.exports = articlesRouter;
