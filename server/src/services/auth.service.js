import User from "../models/User.js";
import argon2 from "argon2";
import jwt, { decode } from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import { redisVerifyService } from "./otp.service.js";
import { redis } from "../config/redis.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";
import { generateNewToken } from "../utils/generateNewToken.js";
dotenv.config();

export const signupService = async (data) => {
  let { fname, lname, email, password } = data;
  if (!fname || !lname || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }
  fname = fname.trim();
  lname = lname.trim();
  email = email.trim().toLowerCase();
  password = password.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("Invalid email address");
    error.statusCode = 400;
    throw error;
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;
  if (!passwordRegex.test(password)) {
    const error = new Error("Password does not meet requirement");
    error.statusCode = 400;
    throw error;
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("Email already exist, please login");
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await argon2.hash(password);
  const user = await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
  });
  return user;
};

export const verifyService = async (data) => {
  let { email, otp } = data;
  if (!email || !otp) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("Invalid email address");
    error.statusCode = 400;
    throw error;
  }
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email address");
    error.statusCode = 404;
    throw error;
  }
  const storedOTP = await redisVerifyService(email);
  if (otp !== storedOTP) {
    const error = new Error("invalid OTP");
    error.statusCode = 400;
    throw error;
  }
  await redis.del(`email:${email}`);
  user.isVerified = true;
  const verifiedUser = await user.save();
  return user;
};

export const signinService = async (data) => {
  let { email, password } = data;
  if (!email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }
  email = email.trim().toLowerCase();
  password = password.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;
  if (!passwordRegex.test(password)) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 404;
    throw error;
  }
  const verifyPassword = await argon2.verify(user.password, password);
  // if (user.isVerified == false) {
  //   const error = new Error("Account is not verified");
  //   error.statusCode = 400;
  //   throw error;
  // }
  if (!verifyPassword) {
    const error = new Error("Invalid email or password");
    error.statusCode = 404;
    throw error;
  }
  return user._id;
};

export const changeEmailService = async (data) => {
  let { email, newEmail } = data;
  if (!email || !newEmail) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }
  email = email.trim().toLowerCase();
  newEmail = newEmail.trim().toLowerCase();

  if (email === newEmail) {
    const error = new Error("New email must be different");
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("Invalid email address");
    error.statusCode = 400;
    throw error;
  }
  if (!emailRegex.test(newEmail)) {
    const error = new Error("Invalid email address");
    error.statusCode = 400;
    throw error;
  }
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email address");
    error.statusCode = 404;
    throw error;
  }
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { email: newEmail },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return updatedUser;
};

export const refreshTokenService = async (data) => {
  const refreshTokenCookie = data;
  if (!refreshTokenCookie) {
    const error = new Error("Refresh token does not exist");
    error.statusCode = 401;
    throw error;
  }
  const decoded = jwt.verify(
    refreshTokenCookie,
    process.env.JWT_REFRESH_SECRET,
  );
  if (!decoded) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }
  const storedToken = await RefreshToken.findOne({ user: decoded.userId });
  if (!storedToken) {
    const error = new Error("Token not found in database");
    error.statusCode = 401;
    throw error;
  }
  if (storedToken.expiresAt < new Date()) {
    const error = new Error("Token expired");
    error.statusCode = 401;
    throw error;
  }
  const { newAccessToken, newRefreshToken } = await generateNewToken(
    storedToken.user,
  );

  const userId = storedToken.user;
  const tokenId = storedToken._id;
  return { newAccessToken, newRefreshToken, userId, tokenId };
};
