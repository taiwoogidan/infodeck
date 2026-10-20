import {
  changeEmailService,
  signinService,
  signupService,
  verifyService,
} from "../services/auth.service.js";
import { redisService, redisVerifyService } from "../services/otp.service.js";
import { resendSignupService } from "../services/email.service.js";
import { generateToken } from "../utils/generateToken.js";
import dotenv from "dotenv";
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
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
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
