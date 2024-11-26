import express from 'express';

import * as postController from '../controller/post.controller.js';

const router = express.Router();

router.route('/').get(postController.getPosts).post(postController.createPost);

router.get('/:slug', postController.getPost);

export default router;
