import { redis } from "../config/redis.js";
import crypto from "crypto";
export const redisService = async (data) => {
  try {
    const otp = crypto.randomInt(100000, 1000000).toString();
    await redis.set(`email:${data}`, otp, { EX: 600 });
    return otp;
  } catch (error) {
    return error.message;
  }
};

export const redisVerifyService = async (data) => {
  try {
    const storedOTP = await redis.get(`email:${data}`);
    if (!storedOTP) {
      const error = new Error("Invalid OTP");
      error.statusCode = 404;
      throw error;
    }
    return storedOTP;
  } catch (error) {
    console.error(error.message);
  }
};
