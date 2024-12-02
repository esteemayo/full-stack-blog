import { StatusCodes } from 'http-status-codes';

import User from '../model/user.model.js';
import Comment from '../model/comment.model.js';

import { UnauthenticatedError } from '../errors/unauthenticated.error.js';

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate('user', 'username img')
    .sort('-createdAt');

  return res.status(StatusCodes.OK).json(comments);
};

export const addComment = async (req, res, next) => {
  const { postId } = req.params;
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return next(new UnauthenticatedError('Not authenticated'));
  }

  const user = await User.findOne({ clerkUserId });

  if (!req.body.user) req.body.user = user._id;
  if (!req.body.post) req.body.post = postId;

  const comment = await Comment.create({ ...req.body });

  return res.status(StatusCodes.CREATED).json(comment);
};
