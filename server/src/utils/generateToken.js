import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = async (data) => {
  const accessToken = jwt.sign(
    { userId: data },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1m" },
  );
  const refreshToken = jwt.sign(
    { userId: data },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
};
