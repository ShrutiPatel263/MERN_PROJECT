import { Post } from "../models/post.model.js";

import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const createPost= asyncHandler(async (req, res) => {
    const {companyName, jobTitle, topicsCovered, interviewType, roundDetails, date, tips, materialLinks, difficultyLevel,results}=req.body;

    // Validate required fields
    if(!companyName || !jobTitle || !topicsCovered || !interviewType || !roundDetails || !date || !tips || !difficultyLevel){
        throw new ApiError(400, "All fields are required");
    }

    //Create a post 
    const post= await Post.create({
        owner: req.user._id,
        companyName,
        jobTitle,
        topicsCovered,
        interviewType,
        roundDetails,
        date,
        tips,
        materialLinks,
        difficultyLevel,
        results
    })

    if(!post){
        throw new ApiError(500,"Post creation failed");
    }

    //Return the created post
    return res.status(201).json(
        new ApiResponse(201, "Post created successfully", post)
    );
})

const getAllPosts = asyncHandler(async (req, res) => {
    //Fetch all posts
    const posts = await Post.find().populate('owner', 'userName name').sort({createdAt: -1});

    if(!posts){
        throw new ApiError(404, "No posts found");
    }

    //Return the posts
    return res.status(200).json(
        new ApiResponse(200, "Posts fetched successfully", posts)
    );
})

const editPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { companyName, jobTitle, topicsCovered, interviewType, roundDetails, date, tips, materialLinks, difficultyLevel, results } = req.body;

    if(!postId){
        throw new ApiError(400,"Post Id not found");
    }
    // Validate required fields
    if(!companyName || !jobTitle || !topicsCovered || !interviewType || !roundDetails || !date || !tips || !difficultyLevel){
        throw new ApiError(400, "All fields are required");
    }

    //Find the post
    const updatedPost = await Post.findByIdAndUpdate(
        postId,{
            $set:{
                companyName,
                jobTitle,
                topicsCovered,
                interviewType,
                roundDetails,
                date,
                tips,
                materialLinks,
                difficultyLevel,
                results
            }
        },
            {new: true,}
        )

        if(!updatedPost){
            throw new ApiError(404, "Post not found");
        }

    //Return the updated post

    return res.status(200).json(
        new ApiResponse(200, "Post updated successfully", updatedPost)
    );
})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if(!postId){
        throw new ApiError(400,"Post Id not found");
    }

    //Find the post
    const deletedPost = await Post.findByIdAndDelete(postId);

    if(!deletedPost){
        throw new ApiError(404, "Post not found");
    }

    //Return the deleted post
    return res.status(200).json(
        new ApiResponse(200, "Post deleted successfully", deletedPost)
    )
})

const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if(!postId){
        throw new ApiError(400,"Post Id not found");
    }

    //Find the post
    const post = await Post.findById(postId).populate('owner', 'userName name');

    if(!post){
        throw new ApiError(404, "Post not found");
    }

    //Return the post
    return res.status(200).json(
        new ApiResponse(200, "Post fetched successfully", post)
    );
})

export {
        createPost,
        getAllPosts, 
        editPost, 
        deletePost, 
        getPostById
};
