import { Router } from "express";
import { bookController } from "./book.controller.ts";
import { authorizeRoles } from "../../middlewares/auth/roleCheck.ts";
import { auth } from "../../middlewares/auth/auth.middleware.ts";

export const router = Router();

router.post("/add-book", auth, authorizeRoles("ADMIN"), bookController.createBook);
router.delete("/delete-book/:id", auth, authorizeRoles("ADMIN"), bookController.deleteBook);
router.get("/:id", auth, bookController.getBookById);
router.get("/", auth, bookController.getAllBooks);
router.put("/:id", auth, authorizeRoles("ADMIN"), bookController.updateBook);

export default router;