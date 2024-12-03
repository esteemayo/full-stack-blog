import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

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
