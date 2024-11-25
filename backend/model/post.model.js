import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      trim: true,
    },
    desc: {
      type: String,
    },
    slug: {
      type: String,
      required: [true, 'A post must have a slug'],
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'A post must have a content'],
    },
    img: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    visit: {
      type: Number,
      default: 0,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'A post must belong to a user'],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
