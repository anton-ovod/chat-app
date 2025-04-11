import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import {
  deleteMessage,
  editMessage,
  getMessages,
  sendMessage,
} from "@/controllers/message.controller";
import { validate } from "@/middlewares/validate.middleware";
import { sendMessageSchema } from "@/schemas/message.schema";

const router = express.Router();

router.get("/:username", protectRoute, getMessages);
router.post(
  "/send/:username",
  protectRoute,
  validate(sendMessageSchema),
  sendMessage
);
router.put(
  "/edit/:messageId",
  protectRoute,
  validate(sendMessageSchema),
  editMessage
);
router.delete("/delete/:messageId", protectRoute, deleteMessage);

export default router;
