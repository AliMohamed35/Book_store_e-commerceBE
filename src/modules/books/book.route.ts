import { Router } from "express";
import { bookController } from "./book.controller.ts";

export const router = Router();

router.post("/add-book", bookController.createBook);

export default router;