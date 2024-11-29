import express from 'express';
import morgan from 'morgan';
import 'colors';

import commentRoute from './routes/comment.route.js';
import userRoute from './routes/user.route.js';
import webHookRoute from './routes/webhook.route.js';
import postRoute from './routes/post.route.js';

import { NotFoundError } from './errors/not.found.error.js';
import { errorHandlerMiddleware } from './middlewares/error.handler.middleware.js';

const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.use('/webhooks', webHookRoute);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', commentRoute);

app.all('/*splat', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandlerMiddleware);

export default app;
