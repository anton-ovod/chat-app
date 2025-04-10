import {
  createConversation,
  deleteConversation,
  getConversationDetails,
  getConversations,
} from "@/controllers/conversation.controller";
import { protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { createConversationSchema } from "@/schemas/conversation.schema";
import { Router } from "express";

const router = Router();

router.get("/", protectRoute, getConversations);
router.post(
  "/",
  protectRoute,
  validate(createConversationSchema),
  createConversation
);
router.get("/:conversationId", protectRoute, getConversationDetails);
router.delete("/:conversationId", protectRoute, deleteConversation);

export default router;
