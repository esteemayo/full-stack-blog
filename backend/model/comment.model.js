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
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
