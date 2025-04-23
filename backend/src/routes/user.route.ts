import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import {
  findUserByFullName,
  updateProfile,
} from "@/controllers/user.controller";
import { validate } from "@/middlewares/validate.middleware";
import {
  userFullNameSchema,
  userProfileUpdateSchema,
} from "@/schemas/user.schema";

const router = express.Router();

router.put(
  "/update-profile",
  protectRoute,
  validate({ body: userProfileUpdateSchema }),
  updateProfile
);

router.get(
  "/find/:fullName",
  protectRoute,
  validate({ params: userFullNameSchema }),
  findUserByFullName
);

export default router;
