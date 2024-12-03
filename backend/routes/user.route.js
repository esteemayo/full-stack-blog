import express from 'express';

import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/saved', userController.getUserSavedPosts);

router.patch('/save', userController.savedPost);

export default router;
