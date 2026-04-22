const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.id;

  if (followeeId == followerId) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    _id: followeeId,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following ${followeeId}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerId,
    followee: followeeId,
  });

  res.status(201).json({
    message: `You are now following ${followeeId}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerId = req.user._id;
  const followeeId = req.params.id;

  const isUserFollowing = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeId}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeId}`,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
};
