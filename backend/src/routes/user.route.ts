import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import { updateProfile } from "@/controllers/user.controller";
import { validate } from "@/middlewares/validate.middleware";
import { userProfileUpdateSchema } from "@/schemas/user.schema";

const router = express.Router();

router.put(
  "/update-profile",
  protectRoute,
  validate({ body: userProfileUpdateSchema }),
  updateProfile
);

export default router;
