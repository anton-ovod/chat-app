import {
  createConversation,
  deleteConversation,
  getConversations,
} from "@/controllers/conversation.controller";
import { protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  conversationIdSchema,
  createConversationSchema,
  conversationPaginationQuerySchema,
} from "@/schemas/conversation.schema";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  protectRoute,
  validate({ query: conversationPaginationQuerySchema }),
  getConversations
);
router.post(
  "/",
  protectRoute,
  validate({ body: createConversationSchema }),
  createConversation
);
router.delete(
  "/:conversationId",
  protectRoute,
  validate({ params: conversationIdSchema }),
  deleteConversation
);

export default router;
