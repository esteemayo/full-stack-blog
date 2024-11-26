import express from 'express';
import 'colors';

import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import commentRoute from './routes/comment.route.js';

import { NotFoundError } from './errors/not.found.error.js';
import { errorHandlerMiddleware } from './middlewares/error.handler.middleware.js';

const app = express();

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
