import express from 'express';

import * as webHookController from '../controllers/webhook.controller.js';

const router = express.Router();

router.post('/clerk', webHookController.clerkWebHook);

export default router;
