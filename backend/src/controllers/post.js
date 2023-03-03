const catchAsyncError = require("../middlewares/catchAsyncError");
const post = require("../models/post");

exports.createPost = catchAsyncError(async function (req, res, next) {
  const post = await post.create(req.body);
  return res.status(201).json({
    status: true,
    message: "Post Created successfully",
    data: post,
  });
});
