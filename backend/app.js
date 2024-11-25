import express from 'express';
import 'colors';

import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import commentRoute from './routes/comment.route.js';

const app = express();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', commentRoute);

export default app;
