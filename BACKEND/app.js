const dotenv = require('dotenv');
dotenv.config();

const express=require('express');
const app=express();
const cors = require('cors');
const connectDB = require('./db/db');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

export { app };
