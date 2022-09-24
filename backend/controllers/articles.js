const connection = require("../models/db");

const getAllArticles = (req, res) => {
  const query = `SELECT * FROM articles WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the articles",
      result: result,
    });
  });
};

const getArticlesByAuthor = (req, res) => {
  const author_id = req.query.id;

  const query = `SELECT * FROM articles WHERE author_id=? AND is_deleted=0;`;
  const data = [author_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        massage: `All the articles for the author: ${author_id}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `The author: ${author_id} has no articles`,
      });
    }
  });
};

const getArticleById = (req, res) => {
  const id = req.query.id;

  const query = `SELECT title,description,firstname,author_id FROM users INNER JOIN articles ON users.id=articles.author_id WHERE articles.id=? AND articles.is_deleted=0;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      res.status(404).json({
        success: false,
        massage: "The Article is Not Found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The article ${id}`,
      result: result,
    });
  });
};

const createNewArticle = (req, res) => {
  const { title, description } = req.body;
  const author_id = req.token.userId;
  const query = `INSERT INTO articles (title, description, author_id) VALUES (?,?,?);`;
  const data = [title, description, author_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Article created",
      result: result,
    });
  });
};

const updateArticleById = (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;

  const query = `SELECT * FROM articles WHERE id=?;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (!result) {
      res.status(404).json({
        success: false,
        massage: `The Article: ${id} is not found`,
        err: err,
      });
    } // result are the data returned by mysql server
    else {
      const query = `UPDATE articles SET title=?, description=? WHERE id=?;`;
      const data = [
        title || result[0].title,
        description || result[0].description,
        id,
      ];

      connection.query(query, data, (err, result) => {
        if (result.affectedRows != 0)
          res.status(201).json({
            success: true,
            massage: `Article updated`,
            result: result,
          });
      });
    }
  });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE articles SET is_deleted=1 WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The Article: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete article with id: ${id}`,
      result: result,
    });
  });
};

const deleteArticlesByAuthor = (req, res) => {
  const author_id = req.body.author_id;

  const query = `UPDATE articles SET is_deleted=1 WHERE author_id=?;`;
  const data = [author_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `No articles for this author `,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Deleted articles for the author: ${author_id} `,
      result: result,
    });
  });
};

const getCommentById = (req, res) => {
  const id = req.params.article_id;
  console.log(id);
  const query = `SELECT * FROM comments WHERE article_id=?`;
  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.length) {
      res.status(404).json({
        success: false,
        massage: "The Article Not found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The article ${id}`,
      results: results,
    });
  });
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
  getCommentById,
};
