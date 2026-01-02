import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


// // export const verifyJWT=asyncHandler(async (req,_,next)=>{  //Here res not used so we can write it as "_"
// // try {
// //         const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        
// //         if(!token){
// //             throw new ApiError(401,"Unauthorized request")
// //         }
    
// //         const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
// //         const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
// //         if(!user){
// //             throw new ApiError(401,"Invalid Access Token")
// //         }
    
// //         req.user=user
    
// //         next()
// // } catch (error) {
// //     throw new ApiError(401,error?.message || "invalid access token ")
// // }
// // })
 
// // //-------------------Admin Middleware --------------------
// // export const verifyAdmin=asyncHandler(async(req,_,next)=>{
// //     if(req.user.role!=="admin"){
// //         throw new ApiError(403,"forbidden,admin only");
// //     }else{
// //         next()
// //     }
// // })

// // //-------------------Seller Middleware--------------------
// // export const verifySeller=asyncHandler(async(req,_,next)=>{
// //     if(req.user.role!=="seller"){
// //         throw new ApiError(403,"forbidden,seller only")
// //     }else{
// //         next();
// //     }
// // })

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//   try {
//     let token;

//     if (req.cookies?.accessToken) {
//       token = req.cookies.accessToken;
//     } else if (req.header("Authorization")) {
//       const authHeader = req.header("Authorization");
//       if (authHeader.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];
//       }
//     }

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findById(decodedToken._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token");
//     }

//     req.user = user;

//     next();
//   } catch (err) {
//     throw new ApiError(401, err.message || "Invalid access token");
//   }
// });

// ...existing code...
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token;
    const cookieToken = req.cookies?.accessToken;
    const authHeader =
      req.header("Authorization") ||
      req.header("authorization") ||
      req.get?.("authorization");

    if (cookieToken) {
      token = cookieToken;
    } else if (authHeader) {
      // accept either "Bearer <token>" or raw token
      token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;
    }

    if (!token || typeof token !== "string") {
      throw new ApiError(401, "Unauthorized request - no token provided");
    }
    
    token = token.trim();
    if (token.startsWith("Bearer ")) token = token.slice(7).trim();

    // Validate token format (JWT should have 3 parts separated by dots)
    if (token.split('.').length !== 3) {
      console.log('❌ Invalid token format:', token.substring(0, 50) + '...');
      throw new ApiError(401, "Invalid token format");
    }

    console.log('🔐 Verifying token:', token.substring(0, 30) + '...');
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('✅ Token verified:', decodedToken._id);

    const user = await User.findById(decodedToken._id || decodedToken.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token - user not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('❌ Auth Error:', err.message);
    throw new ApiError(401, err?.message || "Invalid access token");
  }
});
// ...existing code...