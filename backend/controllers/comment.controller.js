import { StatusCodes } from 'http-status-codes';

import Comment from '../model/comment.model.js';

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate('user', 'username img')
    .sort('-createdAt');

  return res.status(StatusCodes.OK).json(comments);
};
