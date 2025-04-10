import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import {
  deleteMessage,
  editMessage,
  getMessages,
  sendMessage,
} from "@/controllers/message.controller";

const router = express.Router();

router.get("/:username", protectRoute, getMessages);
router.post("/send/:username", protectRoute, sendMessage);
router.post("/edit/:messageId", protectRoute, editMessage);
router.delete("/delete/:messageId", protectRoute, deleteMessage);

export default router;
