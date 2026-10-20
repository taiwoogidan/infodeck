import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRouter from "./routes/auth.route.js";
import profileRouter from "./routes/profile.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
// app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", profileRouter);

export default app;
