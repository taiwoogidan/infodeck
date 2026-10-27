import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateNewToken = async (data) => {
  const newAccessToken = jwt.sign(
    { userId: data },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1m" },
  );
  const newRefreshToken = jwt.sign(
    { userId: data },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
  return { newAccessToken, newRefreshToken };
};
