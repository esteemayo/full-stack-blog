import express from 'express';

import * as commentController from '../controllers/comment.controller.js';

const router = express.Router();

router
  .route('/:postId')
  .get(commentController.getPostComments)
  .post(commentController.addPost);

export default router;
