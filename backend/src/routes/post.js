const express = require("express");
const {
  createPost,
  getSinglePost,
  createComment,
  commentOnComment,
  getPost,
  updateComment,
  deleteComment,
} = require("../controllers/post");

const router = express.Router();

router.route("/create/post").post(createPost);
router.route("/posts").get(getPost);
router.route("/post/:id").get(getSinglePost);
router.route("/post/:id/comments").post(createComment)
router.route("/comment/:id/comments").post(commentOnComment)
router.route("/comment/:id").put(updateComment).delete(deleteComment);

module.exports = router;
