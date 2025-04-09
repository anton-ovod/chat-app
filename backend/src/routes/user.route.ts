import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import { updateProfile } from "@/controllers/user.controller";

const router = express.Router();

router.put("/update-profile", protectRoute, updateProfile);

export default router;
