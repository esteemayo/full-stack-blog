import express from 'express';
import bodyParser from 'body-parser';

import * as webHookController from '../controllers/webhook.controller.js';

const router = express.Router();

router.post(
  '/clerk',
  bodyParser.raw({ type: 'application/json' }),
  webHookController.clerkWebHook
);

export default router;
