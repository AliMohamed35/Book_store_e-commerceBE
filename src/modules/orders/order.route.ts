import { Router } from "express";
import { orderController } from "./order.controller.ts";
import { auth } from "../../middlewares/auth/auth.middleware.ts";

export const router = Router();

router.post("/order-book/:id", auth, orderController.placeOrder);
router.delete("/delete-order/:id", auth, orderController.deleteOrder);

export default router;