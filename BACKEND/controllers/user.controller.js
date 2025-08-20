import { User } from "../models/user.model.js";

import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose, { Mongoose } from "mongoose";

const generateAccessAndRefereshTokens = async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}



module.exports.registerUser = async (req, res,next) => {
     //Get details from fronted 
     //validate-->not empty
     //Check if user already exists

     //Create user
     //remove password and refres token  from response

     //Checkout for user creation
     //return response

     const { name, email, password,userName, branch} = req.body;

     //Now validate (Check if not empty)
     if([
        name,
        email,
        password,
        userName,
        branch]
     .some((field) =>
        field?.trim() === ''
        )
     )
{
    throw new ApiError(400, "All fields are required");
}

        //Check if user already exists
    const userExists = await User.findOne({
        $or:[{userName},{email}]
    })

     if(existedUser){
    throw new ApiError(409,"User with email or username already exist")
    }

    const user=await User.create({
        name,
        email,
        userName,
        password,
        branch
    })

    //remove password and refreshToken from response
    const createdUser=await User.findById(user._id).select("-password -refreshToken");
    
    if(!createdUser){
        throw new ApiError(500, "User creation failed");
    }

    return res.status(201).json(
        new ApiResponse(201, "User created successfully", createdUser)
    );
}

const loginUser = asyncHandler(async (req, res, next) => {

    //Take data from frontend (email,password)
    //Validate data
    //find the user
    //Check if password is correct
    //access & refreshtoken
    //send cookie
    //send response successfully loggedin 

    const { email, password } = req.body;
    if(!email){
        throw new ApiError(400,"Email is required");
    }

    if(!password){
        throw new ApiError(400,"Password is required");
    }

    //Find the user
    const user = await User.findOne({
        email
    });

    if(!user){
        throw new ApiError(404,"User not found");
    }

    //Check if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid email or password");
    }

    const loggedInUser=await User.findById(user._id).select("-password -refreshtoken");

        const options={
      httpOnly:true,
      secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse(
        200,{
          user:loggedInUser,accessToken,refreshToken
        },
        "User logged in successfully"
      )
    )

    
const logoutUser=asyncHandler(async (req,res) =>{
  //Remove cookies
  //Remove refreshToken
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset:{
        refreshToken:1//this removes the feild from document
      }
    },
    {
      new:true 
    }
  )

  const options ={
    httpOnly:true,
    secure:true
  }

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"User Logged Out"))

 })

 const refreshAccessToken  = asyncHandler(async (req,res)=>{
   const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

   if(!incomingRefreshToken){
    throw new ApiError(401,"unauthorized request")
   }

   try {
    const decodedToken = jwt.verify(
     incomingRefreshToken,
     process.env.ACCESS_TOKEN_SECRET
    )
 
    const user = await User.findById(decodedToken?._id)
 
    if(!user){
      throw new ApiError(401,"Invalid RefreshToken")
    }
 
    if(incomingRefreshToken !== user?.refreshToken){
     throw new ApiError(401,"Refresh  token is expired or used")
    }
 
    const options={
     httpOnly:true,
     secure:true
    }
 
    const {accessToken,newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
 
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
     new ApiResponse(
       200,
       {accessToken,refreshToken : newRefreshToken},
       "New Access token generated"
     )
    )
   } catch (error) {
     throw new ApiError(401,error?.message || "Invalid refreshToken")
   }

})

})