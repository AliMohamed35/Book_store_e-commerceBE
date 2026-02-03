import { Router } from "express";
import { bookController } from "./book.controller.ts";
import { authorizeRoles } from "../../middlewares/auth/roleCheck.ts";
import { auth } from "../../middlewares/auth/auth.middleware.ts";

export const router = Router();

router.post("/add-book", auth, authorizeRoles("ADMIN"), bookController.createBook);

export default router;