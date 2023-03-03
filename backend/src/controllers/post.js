const catchAsyncError = require("../middlewares/catchAsyncError");
const Post = require("../models/post");
const Comment = require("../models/comment");
const ErrorHandler = require("../utils/errorHandler");

// create post
exports.createPost = catchAsyncError(async function (req, res, next) {
  const post = await Post.create(req.body);
  return res.status(201).json({
    status: true,
    message: "Post Created successfully",
    data: post,
  });
});

//get all post
exports.getPost = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find().populate("comments");
  return res.status(201).json({
    status: true,
    data: posts,
  });
});

//get single post
exports.getSinglePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post) {
    return next(new ErrorHandler("Post not Found", 404));
  }
  return res.status(200).json({
    success: true,
    post,
  });
});

//create comment
exports.createComment = catchAsyncError(async (req, res, next) => {
  const { author, body } = req.body;
  const comment = new Comment({ author, body });
  const post = await Post.findById(req.params.id);
  post.comments.push(comment);
  await comment.save();
  await post.save();
  return res.status(200).json({
    success: true,
    message: comment,
  });
});

//comment on comment
exports.commentOnComment = catchAsyncError(async (req, res, next) => {
  const { author, body } = req.body;
  const parentComment = await Comment.findById(req.params.id);
  if(!parentComment){
    return next(new ErrorHandler("parentComment not Found",404));
  }
  const comment = new Comment({ author, body, parentComment });
  parentComment.childComments.push(comment);
  await comment.save();
  await parentComment.save();
  return res.status(200).json({
    success: true,
    message: comment,
  });
});

//update the comment
exports.updateComment = catchAsyncError(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if(!comment){
    return next(new ErrorHandler("Comment not Found",404));
  }
  const { author, body } = req.body;
  comment.author = author;
  comment.body = body;
  await comment.save();
  return res.status(200).json({
    success: true,
    message: comment,
  });
});

//delete the comment
exports.deleteComment = catchAsyncError(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if(!comment){
    return next(new ErrorHandler("Comment not Found",404));
  }
  if (comment.parentComment) {
    const parentComment = await Comment.findById(comment.parentComment);
    parentComment.childComments = parentComment.childComments.filter(
      (childComment) => childComment != req.params.id
    );
    await parentComment.save();
  }
  await Comment.findByIdAndDelete(req.params.id);
  return res.json({ message: "Comment deleted" });
});
