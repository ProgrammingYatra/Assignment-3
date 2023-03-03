const mongoose=require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    parentComment: {
      type: objectId,
      ref: 'Comment',
    },
    childComments: [
      {
        type: objectId,
        ref: 'Comment',
      },
    ],
  });
  
  module.exports  = mongoose.model('Comment', commentSchema);  