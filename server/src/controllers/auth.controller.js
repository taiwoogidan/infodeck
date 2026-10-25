import {
  changeEmailService,
  refreshTokenService,
  signinService,
  signupService,
  verifyService,
} from "../services/auth.service.js";
import { redisService, redisVerifyService } from "../services/otp.service.js";
import { resendSignupService } from "../services/email.service.js";
import { generateToken } from "../utils/generateToken.js";
import dotenv from "dotenv";
import { storeRefreshToken } from "../utils/storeRefreshToken.js";
import User from "../models/User.js";
dotenv.config();
export const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    const redis = await redisService(user.email);
    const resend = await resendSignupService(user.email, redis);
    res.status(201).json({
      success: true,
      message: "Account signed up successfully",
      user: user.email,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await verifyService(req.body);
    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await signinService(req.body);
    const { accessToken, refreshToken } = await generateToken(user);
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    await storeRefreshToken(user, refreshToken);
    res.status(200).json({
      success: true,
      message: "Signin successful",
    });
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const changeEmail = async (req, res) => {
  try {
    // console.log(req.body);
    const user = await changeEmailService(req.body);
    const redis = await redisService(user.email);
    const resend = await resendSignupService(user.email, redis);
    res.status(200).json({
      success: true,
      message: "Email changed successfully",
      user: user.email,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { generateNewAccessToken, generateNewRefreshToken, dataId } =
      await refreshTokenService(req.cookies.refreshToken);
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("accessToken", generateNewAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });
    res.cookie("refreshToken", generateNewRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    await storeRefreshToken(dataId, generateNewRefreshToken);
    res.status(200).json({
      success: true,
      message: "Refresh Token Rotated",
    });
  } catch (error) {
    console.error(error.message);
  }
};
