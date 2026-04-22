const express = require("express");
const likeController = require("../controllers/like.controller");
const likeRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware");

likeRouter.post("/:id", identifyUser, likeController.postLikeController);

module.exports = likeRouter;
