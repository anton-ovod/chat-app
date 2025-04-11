import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import {
  deleteMessage,
  editMessage,
  getMessages,
  sendMessage,
} from "@/controllers/message.controller";
import { validate } from "@/middlewares/validate.middleware";
import { MessageIdSchema, sendMessageSchema } from "@/schemas/message.schema";
import { userNameSchema } from "@/schemas/user.schema";

const router = express.Router();

router.get("/:username", protectRoute, getMessages);
router.post(
  "/send/:username",
  protectRoute,
  validate({ params: userNameSchema, body: sendMessageSchema }),
  sendMessage
);
router.put(
  "/edit/:messageId",
  protectRoute,
  validate({ params: MessageIdSchema, body: sendMessageSchema }),
  editMessage
);
router.delete(
  "/delete/:messageId",
  protectRoute,
  validate({ params: MessageIdSchema }),
  deleteMessage
);

export default router;
