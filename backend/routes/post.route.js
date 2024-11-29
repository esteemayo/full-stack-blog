import express from 'express';

import * as postController from '../controllers/post.controller.js';

const router = express.Router();

router.get('/upload-auth', postController.uploadAuth);

router.route('/').get(postController.getPosts).post(postController.createPost);

router.get('/:slug', postController.getPost);

router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost);

export default router;
