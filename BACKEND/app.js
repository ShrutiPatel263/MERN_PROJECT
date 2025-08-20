import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app=express();

import cors from 'cors';
import connectDB from './db/db.js';

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

export default app;
