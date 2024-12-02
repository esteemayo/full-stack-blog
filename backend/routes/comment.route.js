import express from 'express';

import * as commentController from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/:postId', commentController.getPostComments);

export default router;
