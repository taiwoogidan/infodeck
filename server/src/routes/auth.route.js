import express from "express";
import {
  changeEmail,
  signin,
  signup,
  verify,
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/verify", verify);
router.post("/signin", signin);
router.patch("/change-email", changeEmail);

export default router;
