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
  "/follow/:id",
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
 * @route GET /api/users/follow/requests
 * @description Follow request
 * @access Private
 */
userRouter.get(
  "/follow/requests",
  identifyUser,
  userController.getPendingRequests,
);

/**
 * @route patch /api/users/follow/accept/:id
 * @description Accept follow request
 * @access Private
 */

userRouter.patch(
  "/follow/accept/:id",
  identifyUser,
  userController.acceptFollowRequest,
);

/**
 * @route patch /api/users/follow/reject/:id
 * @description Reject follow request
 * @access Private
 */
userRouter.patch(
  "/follow/reject/:id",
  identifyUser,
  userController.rejectFollowRequest,
);
module.exports = userRouter;
