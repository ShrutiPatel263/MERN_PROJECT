import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app=express();

import cors from 'cors';
import connectDB from './db/db.js';

connectDB();

// CORS configuration to allow credentials and requests from frontend
const corsOptions = {
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  // If it's an ApiError with statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      statusCode: err.statusCode
    });
  }
  
  // For other errors
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode: 500
  });
});

export default app;
