const express = require("express");
const cookieParser = require("cookie-parser");

// Creating the instance of app
const app = express();

// Middlewarw
app.use(express.json());
app.use(cookieParser());

// Exporting the rout :
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.router");
const likeRouter = require("./routes/like.rout");
//Using the routes :
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/like", likeRouter);

module.exports = app;
