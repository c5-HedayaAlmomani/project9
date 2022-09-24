import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [articles, setArticles] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");

  //===============================================================

  const getAllArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res)
      if (res.data.success) {
        setArticles(res.data.result);
        setMessage("");
        setShow(true);
        setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const handleUpdateClick = (article) => {
    setUpdateBox(!updateBox);
    setArticleId(article.id);
    setTitle(article.title);
    setDescription(article.description);
    if (updateBox) updateArticle(article.id);
  };

  //===============================================================

  const updateArticle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/articles/${id}`, {
        title,
        description,
      });
      getAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      getAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const addComment = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/articles/${id}/comments`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllArticles();
    } catch (error) {
      console.log(error.response);
    }
  };

  //===============================================================

  useEffect(() => {
    getAllArticles();
  }, []);

  //===============================================================

  return (
    <>
      <br />
      {show &&
        articles.map((article, index) => (
          <div key={index} className="article">
            <div>{article.title}</div>
            <div>{article.description}</div>
            <div>
              {article.comments ? (
                article.comments.map((comment, i) => {
                  return (
                    <p className="comment" key={i}>
                      {comment.comment}
                    </p>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            {article.author === userId && (
              <>
                {updateBox && articleId === article.id && (
                  <form>
                    <br />
                    <input
                      type="text"
                      defaultValue={article.title}
                      placeholder="article title here"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />

                    <textarea
                      placeholder="article description here"
                      defaultValue={article.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </form>
                )}
                <button
                  className="delete"
                  onClick={() => deleteArticle(article.id)}
                >
                  X
                </button>
                <button
                  className="update"
                  onClick={() => handleUpdateClick(article)}
                >
                  Update
                </button>
              </>
            )}
            <div>
              <textarea
                className="commentBox"
                placeholder="comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="commentBtn"
                onClick={() => {
                  addComment(article.id);
                }}
              >
                Add comment
              </button>
            </div>
          </div>
        ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
