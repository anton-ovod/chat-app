import {
  createConversation,
  getConversationByUsername,
  getConversations,
} from "@/controllers/conversation.controller";
import { protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { createConversationSchema } from "@/schemas/conversation.schema";
import { Router } from "express";

const router = Router();

router.get("/", protectRoute, getConversations);
router.get("/:username", protectRoute, getConversationByUsername);
router.post(
  "/",
  protectRoute,
  validate(createConversationSchema),
  createConversation
);

export default router;
