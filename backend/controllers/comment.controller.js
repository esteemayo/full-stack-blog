import { StatusCodes } from 'http-status-codes';

import User from '../model/user.model.js';
import Comment from '../model/comment.model.js';

import { ForbiddenError } from '../errors/forbidden.error.js';
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

  if (!req.body.post) req.body.post = postId;
  if (!req.body.user) req.body.user = user._id;

  const comment = await Comment.create({ ...req.body });

  setTimeout(() => {
    return res.status(StatusCodes.CREATED).json(comment);
  }, 3000);
};

export const deleteComment = async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  const { id: commentId } = req.params;

  if (!clerkUserId) {
    return next(new UnauthenticatedError('Not authenticated'));
  }

  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  if (role === 'admin') {
    await Comment.findByIdAndDelete(commentId);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  const user = await User.findOne({ clerkUserId });

  const comment = await Comment.findOneAndDelete({
    _id: commentId,
    user: user._id,
  });

  if (!comment) {
    return next(new ForbiddenError('You can delete only your comment!'));
  }

  return res.status(StatusCodes.NO_CONTENT).end();
};
