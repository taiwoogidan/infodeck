import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import connectRedis from "./config/redis.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async (req, res) => {
  try {
    await connectDB();
    await connectRedis();
    app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
startServer();
