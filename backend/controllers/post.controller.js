import ImageKit from 'imagekit';
import { StatusCodes } from 'http-status-codes';

import Post from '../model/post.model.js';
import User from '../model/user.model.js';

import { ForbiddenError } from './../errors/forbidden.error.js';
import { NotFoundError } from '../errors/not.found.error.js';
import { UnauthenticatedError } from './../errors/unauthenticated.error.js';

const { IMAGE_KIT_URL_ENDPOINT, IMAGE_KIT_PUBLIC_KEY, IMAGE_KIT_PRIVATE_KEY } =
  process.env;

const imageKit = new ImageKit({
  urlEndpoint: IMAGE_KIT_URL_ENDPOINT,
  publicKey: IMAGE_KIT_PUBLIC_KEY,
  privateKey: IMAGE_KIT_PRIVATE_KEY,
});

export const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const skip = (page - 1) * limit;

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  const posts = await Post.find()
    .populate('user', 'username')
    .limit(limit)
    .skip(skip);

  return res.status(StatusCodes.OK).json({
    posts,
    hasMore,
  });
};

export const uploadAuth = async (req, res, next) => {
  const result = imageKit.getAuthenticationParameters();

  return res.status(StatusCodes.OK).json(result);
};

export const getPost = async (req, res, next) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug }).populate('user', 'username img');

  if (!post) {
    return next(
      new NotFoundError(`There is no post found with the given SLUG → ${slug}`)
    );
  }

  return res.status(StatusCodes.OK).json(post);
};

export const createPost = async (req, res, next) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return next(new UnauthenticatedError('You are not authenticated!'));
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return next(new NotFoundError('User not found!'));
  }

  // let slug = req.body.title.replace(/ /g, '-').toLowerCase();

  // let existingPost = await Post.findOne({ slug });

  // let counter = 2;

  // while (existingPost) {
  //   slug = `${slug}-${counter}`;
  //   existingPost = await Post.findOne({ slug });
  //   counter++;
  // }

  if (!req.body.user) req.body.user = user._id;

  const post = await Post.create({ ...req.body });

  return res.status(StatusCodes.CREATED).json(post);
};

export const updatePost = async (req, res, next) => {
  const { id: postId } = req.params;
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return next(new UnauthenticatedError('You are not authenticated!'));
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return next(new NotFoundError('User not found!'));
  }

  const post = await Post.findOneAndUpdate(
    { _id: postId, user: user._id },
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
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return next(new UnauthenticatedError('You are not authenticated!'));
  }

  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  if (role === 'admin') {
    await Post.findByIdAndDelete(postId);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return next(new NotFoundError('User not found!'));
  }

  const deletedPost = await Post.findOneAndDelete({
    _id: postId,
    user: user._id,
  });

  if (!deletedPost) {
    return next(new ForbiddenError('You can delete only your post!'));
  }

  return res.status(StatusCodes.NO_CONTENT).end();
};
