import { Router } from "express";
import { userController } from "../users/user.controller.ts";
import { auth } from "../../middlewares/auth/auth.middleware.ts";

export const router = Router();

// AUTH ROUTES
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);

// CRUDS
router.post("/soft-delete/:id", auth, userController.softDelete);
router.delete("/delete", auth, userController.deleteUser);
router.get("/:id", auth, userController.getUserById);
router.get("/", auth, userController.getAllUsers);

// update all user
router.put("/update-user", auth, userController.updateAllUserField)

export default router;