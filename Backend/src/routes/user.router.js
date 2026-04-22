const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/:id", identifyUser, userController.followUserController);

module.exports = userRouter;
