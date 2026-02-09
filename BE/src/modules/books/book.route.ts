import { Router } from "express";
import { bookController } from "./book.controller";
import { authorizeRoles } from "../../middlewares/auth/roleCheck";
import { auth } from "../../middlewares/auth/auth.middleware";
import { joiAddBook, joiUpdateBook, validate } from "../../middlewares/validation/joi";

export const router = Router();

router.post(
  "/",
  auth,
  validate(joiAddBook, "body"),
  authorizeRoles("ADMIN"),
  bookController.createBook,
);
router.delete(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  bookController.deleteBook,
);
router.get("/:id", auth, bookController.getBookById);
router.get("/", auth, bookController.getAllBooks);
router.put(
  "/:id",
  auth,
  validate(joiUpdateBook, "body"),
  authorizeRoles("ADMIN"),
  bookController.updateBook,
);

export default router;
