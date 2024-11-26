import { StatusCodes } from 'http-status-codes';

import Post from '../model/post.model.js';
import { NotFoundError } from '../errors/not.found.error.js';

export const getPosts = async (req, res, next) => {
  const posts = await Post.find();

  return res.status(StatusCodes.OK).json(posts);
};

export const getPost = async (req, res, next) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug });

  if (!post) {
    return next(
      new NotFoundError(`There is no post found with the given SLUG → ${slug}`)
    );
  }

  return res.status(StatusCodes.OK).json(post);
};

export const createPost = async (req, res, next) => {
  const post = await Post.create({ ...req.body });

  return res.status(StatusCodes.CREATED).json(post);
};

export const updatePost = async (req, res, next) => {
  const { id: postId } = req.params;

  const post = await Post.findByIdAndUpdate(
    postId,
    { $set: { ...req.body } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!post) {
    return next(
      new NotFoundError(`There is no post found with the given ID → ${postId}`)
    );
  }

  return res.status(StatusCodes.OK).json(post);
};

export const deletePost = async (req, res, next) => {
  const { id: postId } = req.params;

  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    return next(
      new NotFoundError(`There is no post found with the given ID → ${postId}`)
    );
  }

  return res.status(StatusCodes.NO_CONTENT).end();
};
