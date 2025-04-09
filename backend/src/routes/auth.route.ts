import { Router, Request, Response } from "express";

import { protectRoute } from "@/middlewares/auth.middleware";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "@/controllers/auth.controller";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;
