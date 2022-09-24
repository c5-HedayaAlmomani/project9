const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const articlesRouter = require("./routes/articles");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const commentsRouter = require("./routes/comments");
const roleRouter = require("./routes/role");
const permissionRouter = require("./routes/permissions");

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/register", registerRouter);
app.use("/articles", articlesRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);
app.use("/permission", permissionRouter);
app.use(commentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
