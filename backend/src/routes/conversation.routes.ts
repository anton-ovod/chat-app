import {
  getConversationByUsername,
  getConversations,
} from "@/controllers/conversation.controller";
import { protectRoute } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/converstations", protectRoute, getConversations);
router.get("/:username", protectRoute, getConversationByUsername);

export default router;
