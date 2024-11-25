import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide your username'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      unique: true,
      trim: true,
      lowerCase: true,
      validate: {
        validator: function (val) {
          const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(val);
        },
        message: 'Please enter a valid email address',
      },
    },
    img: {
      type: String,
    },
    savedPosts: {
      type: [
        {
          type: Types.ObjectId,
          ref: 'Post',
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role is either: admin or user',
      },
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
