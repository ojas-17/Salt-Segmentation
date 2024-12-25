import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import User from '../models/user.model.js';

const register = asyncHandler(async (req, res, _) => {
    
    const {fullname, email, username, password} = req.body;
    
    if ( [fullname, email, username, password].some((field) => field === undefined || field.trim() === "") ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })
    
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        fullname,
        email,
        username : username.toLowerCase(),
        password
    })
    const createduser = await User.findById(user._id).select("-password");

    if (!createduser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, "User created successfully", createduser));
});

const login = asyncHandler(async (req, res, _) => {
    const {email,username, password} = req.body;
    console.log(email,username,password);
    
    if ( !username && !email ) throw new ApiError(400, "Please provide email or username");
    if ( !password ) throw new ApiError(400, "Please provide password");

    const user =  await User.findOne({$or: [{email}, {username}]})
    if (!user) throw new ApiError(404, "User not found");

    const isPasswordCorrect = await user.verifyPassword(password);
    if (!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");
    
    const accessToken = await user.generateAccessToken();
    const loggedinUser = await User.findById(user._id).select("-password");
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, "User logged in successfully", {user :{loggedinUser, accessToken}}));
});

export { register, login };