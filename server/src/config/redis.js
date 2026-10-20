import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (error) => {
  console.error(`Redis error: ${error}`);
  // process.exit(1);
});

export default function connectRedis() {
  try {
    redis.connect();
    console.log("Redis connection successful");
  } catch (error) {
    console.error(error.message);
  }
}
