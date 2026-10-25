import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken";
import dotenv from "dotenv";
dotenv.config();
export const deleteRefreshToken = async (data) => {
  const decoded = jwt.verify(data, process.env.JWT_REFRESH_SECRET);
  const user = await RefreshToken.findByIdAndDelete(decoded.userId);
};
