const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");
// Create Post rout :
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

// get posts rout :
postRouter.get("/", identifyUser, postController.getPostsController);

//Get post details :
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.postDetailsController,
);

//get all feed
postRouter.get("/feed", identifyUser, postController.getFeedController);
module.exports = postRouter;
