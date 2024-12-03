import { StatusCodes } from 'http-status-codes';

import User from '../model/user.model.js';
import { UnauthenticatedError } from '../errors/unauthenticated.error.js';

export const getUserSavedPosts = async (req, res, next) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return next(new UnauthenticatedError('Not authenticated!'));
  }

  const user = await User.findOne({ clerkUserId });

  return res.status(StatusCodes.OK).json(user.savedPosts);
};

export const SavedPost = async (req, res) => {
  const { postId } = req.body;
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return next(new UnauthenticatedError('Not authenticated!'));
  }

  const user = await User.findOne({ clerkUserId });

  const isSaved = user.savedPosts.some((p) => String(p) === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  return res
    .status(StatusCodes.OK)
    .json(isSaved ? 'Post unsaved' : 'Post saved');
};
