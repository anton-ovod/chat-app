import { Router, Request, Response } from "express";

import { protectRoute } from "@/middlewares/auth.middleware";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "@/controllers/auth.controller";
import { validate } from "@/middlewares/validate.middleware";
import { loginSchema, signupSchema } from "@/schemas/auth.schema";

const router = Router();

router.post("/signup", validate({ body: signupSchema }), signup);

router.post("/login", validate({ body: loginSchema }), login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;
