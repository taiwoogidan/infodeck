import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    console.log("[Auth] Access token received:", Boolean(token));

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing. Please authenticate.",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      console.log("[Auth] Token verified successfully");
      console.log("[Auth] Payload:", decoded);
    } catch (error) {
      if (
        error instanceof jwt.TokenExpiredError ||
        error instanceof jwt.JsonWebTokenError
      ) {
        return res.status(401).json({
          success: false,
          message:
            error instanceof jwt.TokenExpiredError
              ? "Access token expired"
              : "Invalid access token",
        });
      }

      throw error;
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found. Please authenticate again.",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    console.error("[Auth] JWT verification failed:", error.name);
    console.error("[Auth] JWT error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
