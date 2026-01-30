import { Router } from "express";
import { orderController } from "./order.controller.ts";
import { auth } from "../../middlewares/auth/auth.middleware.ts";

export const router = Router();

router.post("/order-book/:id", auth, orderController.placeOrder);

export default router;