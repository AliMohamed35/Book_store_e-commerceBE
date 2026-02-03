import { Router } from "express";
import { auth } from "../../middlewares/auth/auth.middleware.ts";
import {
  joiResetPassword,
  joiUserSchema,
  validate,
} from "../../middlewares/validation/joi.ts";
import { userController } from "../users/user.controller.ts";

export const router = Router();

// AUTH ROUTES
router.post("/register", validate(joiUserSchema), userController.register);
router.post("/login", userController.login);
router.post("/verify", userController.verifyUser);
router.post("/logout", async (req, res, next) => {
  try {
    const result = await userController.logout(req, res, next);

    // Clear cookies on logout
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return result;
  } catch (error) {
    next(error);
  }
});

router.post(
  "/reset-password",
  auth,
  validate(joiResetPassword),
  userController.resetPassword,
);

// CRUDS
router.post("/soft-delete/:id", auth, userController.softDelete);
router.delete("/delete-user/:id", auth, userController.deleteUser);
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);

// update all user
router.put("/update-user", auth, userController.updateAllUserField);

export default router;
