import express from 'express';

import { increaseVisit } from '../middlewares/increaseVisit.js';
import * as postController from '../controllers/post.controller.js';

const router = express.Router();

router.get('/upload-auth', postController.uploadAuth);

router.route('/').get(postController.getPosts).post(postController.createPost);

router.get('/:slug', increaseVisit, postController.getPost);

router.patch('/feature', postController.featurePost);

router.delete('/:id', postController.deletePost);

export default router;
