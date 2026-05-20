const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

// Follow User Controller :
async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

// Geting all follow Request
async function getFollowRequestsController(req, res) {
  try {
    const loggedInUsername = req.user.username;

    const followRequests = await followModel.find({
      followee: loggedInUsername,
      status: "pending",
    });

    res.status(200).json({
      message: "Follow requests fetched successfully",
      requests: followRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Accept follow request controller
async function acceptFollowRequestController(req, res) {
  try {
    const currentUser = req.user;

    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
      follower: followerUsername,
      followee: currentUser.username,
    });

    if (!followRequest) {
      return res.status(404).json({
        message: "Follow request not found",
      });
    }

    followRequest.status = "accepted";

    await followRequest.save();

    res.status(200).json({
      message: "Follow request accepted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Reject Follow request controller
async function rejectFollowRequestController(req, res) {
  try {
    const currentUser = req.user;

    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
      follower: followerUsername,
      followee: currentUser.username,
    });

    if (!followRequest) {
      return res.status(404).json({
        message: "Follow request not found",
      });
    }

    followRequest.status = "rejected";

    await followRequest.save();

    res.status(200).json({
      message: "Follow request rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
// unfollow User Controller :
async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}
// Sidebar user
async function getSidebarUsersController(req, res) {
  try {
    // Current Logged In User
    const currentUser = req.user;

    // Fetch All Users Except Current User
    const users = await userModel.find({
      username: { $ne: currentUser.username },
    });

    // Fetch Current User Following Records
    const followRecords = await followModel.find({
      follower: currentUser.username,
    });

    // Fetch Followers Records
    const followerRecords = await followModel.find({
      followee: currentUser.username,
      status: "accepted",
    });

    // Add Follow Status To Users
    const usersWithStatus = users.map((user) => {
      const followRecord = followRecords.find(
        (record) => record.followee === user.username,
      );

      let status = "none";

      if (followRecord) {
        if (followRecord.status === "accepted") {
          status = "following";
        }

        if (followRecord.status === "pending") {
          status = "pending";
        }
      }

      return {
        username: user.username,
        status,
      };
    });

    // Followers List
    const followers = followerRecords.map((record) => {
      return {
        username: record.follower,
      };
    });

    // Following List
    const following = usersWithStatus.filter(
      (user) => user.status === "following",
    );
    // Pending List
    const pending = usersWithStatus.filter((user) => user.status === "pending");
    // Suggestions List
    const suggestions = usersWithStatus.filter(
      (user) => user.status === "none",
    );

    // Final Response
    res.status(200).json({
      followers,
      following,
      pending,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  getFollowRequestsController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getSidebarUsersController,
};
