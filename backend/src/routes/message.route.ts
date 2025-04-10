import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import { sendMessage } from "@/controllers/message.controller";

const router = express.Router();

router.post("/send/:username", protectRoute, sendMessage);

export default router;
