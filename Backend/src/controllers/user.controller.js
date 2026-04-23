const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

// Follow User Controller :
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

// Follow Requests Showing
async function getPendingRequests(req, res) {
  try {
    const userId = req.user.id;

    const requests = await followModel.find({
      followee: userId.toString(),
      status: "pending",
    });
    console.log(requests);

    res.json({
      message: "Pending requests",
      data: requests,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
}

// Accept Request
async function acceptFollowRequest(req, res) {
  try {
    const followId = req.params.id;
    const userId = req.user.id;

    const follow = await followModel.findById(followId);

    if (!follow) {
      return res.status(404).json({
        message: "Request not found",
      });
    }
    // ❌ only followee can accept
    if (follow.followee.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    follow.status = "accepted";
    await follow.save();
    res.json({
      message: "Request accepted",
      data: follow,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
}

//Rejecting the follow request
async function rejectFollowRequest(req, res) {
  try {
    const followId = req.params.id;
    const userId = req.user.id;

    const follow = await followModel.findById(followId);

    if (!follow) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (follow.followee.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    follow.status = "rejected";
    await follow.save();

    res.json({
      message: "Request rejected",
      data: follow,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
}

//Unfollowing the user
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
  getPendingRequests,
  acceptFollowRequest,
  rejectFollowRequest,
};
