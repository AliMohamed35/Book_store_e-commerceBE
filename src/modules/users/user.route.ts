import { Router } from "express";
import { userController } from "../users/user.controller.ts";
import { auth } from "../../middlewares/auth/auth.middleware.ts";

export const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);

export default router;