const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Creating a post :
async function createPostController(req, res) {
  console.log(req.body, req.file);

  // if (!token) {
  //   return res.status(401).json({
  //     message: "Token not provided, Unauthorized access",
  //   });
  // }

  // let decoded;

  // //Decoding the token :
  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   return res.status(401).json({
  //     message: "user not found authorized",
  //   });
  // }

  // console.log(decoded);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully.",
    post,
  });
}

// get all post :
async function getPostsController(req, res) {
  // if (!token) {
  //   return res.status(401).json({
  //     message: "Unauthorized Access",
  //   });
  // }

  // let decoded;

  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   return res.status(401).json({
  //     message: "Invalid token",
  //   });
  // }

  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts fetched successfully.",
    posts,
  });
}

// get post details
async function postDetailsController(req, res) {
  // if (!token) {
  //   return res.status(401).json({
  //     message: "Unauthorize Access",
  //   });
  // }

  // let decoded;

  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   return res.status(401).json({
  //     message: "Invalid Token",
  //   });
  // }

  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }
  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  return res.status(200).json({
    message: "Post fetched  successfully.",
    post,
  });
}

// Get all feed
async function getFeedController(req, res) {
  // if (!token) {
  //   return res.status(401).json({
  //     message: "Unauthorized access",
  //   });
  // }

  // let decoded;

  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   return res.status(401).json({
  //     message: "Invalid Token",
  //   });
  // }

  const feed = await postModel.find({});

  res.status(200).json({
    message: "Feed fetched successfully",
    feed,
  });
}
module.exports = {
  createPostController,
  getPostsController,
  postDetailsController,
  getFeedController,
};
