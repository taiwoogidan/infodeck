import RefreshToken from "../models/RefreshToken.js";
import argon2 from "argon2";
export const storeRefreshToken = async (user, refreshToken) => {
  const tokenHash = await argon2.hash(refreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  console.log(expiresAt);
  console.log(user);
  console.log(refreshToken);
  await RefreshToken.create({
    tokenHash,
    user,
    expiresAt,
  });
};
