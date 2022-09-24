const express = require("express");

//controllers
const { createPermission } = require("../controllers/permission");

const permissionRouter = express.Router();

permissionRouter.post("/:id", createPermission);

module.exports = permissionRouter;
