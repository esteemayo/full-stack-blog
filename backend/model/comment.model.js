import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const commentSchema = new Schema(
  {
    desc: {
      type: String,
      required: [true, 'A comment must have a desc'],
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'A comment must belong to a user'],
    },
    post: {
      type: Types.ObjectId,
      ref: 'Post',
      required: [true, 'A comment must belong to a post'],
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
