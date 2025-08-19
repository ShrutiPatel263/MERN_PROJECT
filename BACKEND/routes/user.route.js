const express=require('express');
const router=express.Router();

//To validate the data we use express-validator package
const { body,validationResult } = require('express-validator');

const userController = require('../controllers/user.controller');

router.post('/register', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address').matches(/^[^\s@]+@vgecg\.ac\.in$/).withMessage('Please enter a valid vgecg.ac.in email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],userController.registerUser);
module.exports = router;
