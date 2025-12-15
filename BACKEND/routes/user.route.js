import express from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword, userProfile } from '../controllers/user.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
import {Router} from "express";

//To validate the data we use express-validator package
import { body, validationResult } from 'express-validator';

const router=Router();

router.post('/register', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address').matches(/^[^\s@]+@vgecg\.ac\.in$/).withMessage('Please enter a valid vgecg.ac.in email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post( verifyJWT,logoutUser);  //Protected route

router.route('/change-password').post(forgotPassword);

router.route('/profile').get(verifyJWT, userProfile);  //Protected route
    
export default router;

