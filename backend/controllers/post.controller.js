import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Post from '../model/post.model.js';
import { NotFoundError } from '../errors/not.found.error.js';

export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  return res.status(StatusCodes.OK).json(posts);
});

export const getPost = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug });

  if (!post) {
    return next(
      new NotFoundError(`There is no post found with the given SLUG → ${slug}`)
    );
  }

  return res.status(StatusCodes.OK).json(post);
});

export const createPost = asyncHandler(async (req, res, next) => {});
