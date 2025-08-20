import express from 'express';
import {
        createPost,
        getAllPosts, 
        editPost, 
        deletePost, 
        getPostById
     } 
    from '../controllers/post.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from 'express';

const router = Router();

router.route('/createpost').post(verifyJWT, createPost);
router.route('/allposts').get(getAllPosts);
router.route('/editpost/:postId').post(verifyJWT, editPost);
router.route('/deletepost/:postId').delete(verifyJWT, deletePost);
router.route('/post/:postId').get(getPostById);

export default router;


