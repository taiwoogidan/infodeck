import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import dotenv from "dotenv";
dotenv.config();
export const refreshTokenDelete = async (data) => {
  const decoded = jwt.verify(data, process.env.JWT_REFRESH_SECRET);
  await RefreshToken.findByIdAndDelete({ _id: decoded.userId });
};
