const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);

/**
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController,
);
/**
 * @route Get /api/users/follow-req/
 * @description Follow requests
 * @access Private
 */
userRouter.get(
  "/follow/requests",
  identifyUser,
  userController.getFollowRequestsController,
);

// Accept Follow Request
userRouter.patch(
  "/follow/accept/:username",
  identifyUser,
  userController.acceptFollowRequestController,
);
// Reject Follow Request Controller
userRouter.patch(
  "/follow/reject/:username",
  identifyUser,
  userController.rejectFollowRequestController,
);

// Get Sidebar users
userRouter.get(
  "/sidebar/users",
  identifyUser,
  userController.getSidebarUsersController,
);
module.exports = userRouter;
