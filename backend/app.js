import express from 'express';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors;';
import 'colors';

import commentRoute from './routes/comment.route.js';
import userRoute from './routes/user.route.js';
import webHookRoute from './routes/webhook.route.js';
import postRoute from './routes/post.route.js';

import { NotFoundError } from './errors/not.found.error.js';
import { errorHandlerMiddleware } from './middlewares/error.handler.middleware.js';

const app = express();

app.use(cors(process.env.CLIENT_URL));
app.options('*', cors());

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.use(clerkMiddleware);
app.use('/webhooks', webHookRoute);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// app.get("/test",(req,res)=>{
//   res.status(200).send("it works!")
// })

// app.get("/auth-state", (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });

// app.get("/protect", (req, res) => {
//   const {userId} = req.auth;
//   if(!userId){
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content")
// });

// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("content")
// });

app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', commentRoute);

app.all('/*splat', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandlerMiddleware);

export default app;
