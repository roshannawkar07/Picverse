const likeModel = require("../models/like.model");

async function postLikeController(req, res) {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    // check if already liked
    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId,
    });

    if (existingLike) {
      // 👉 UNLIKE
      await likeModel.deleteOne({ _id: existingLike._id });

      return res.status(200).json({
        message: "Post unliked",
        liked: false,
      });
    }

    // 👉 LIKE
    await likeModel.create({
      post: postId,
      user: userId,
    });

    return res.status(201).json({
      message: "Post liked",
      liked: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = { postLikeController };
