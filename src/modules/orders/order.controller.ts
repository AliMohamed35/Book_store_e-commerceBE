import { NextFunction, Response } from "express";
import { AuthRequest } from "../../middlewares/auth/auth.middleware";
import { parseId } from "../../utils/parse/parseId";
import { orderService } from "./order.service";

export class OrderController {
  async placeOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // userId
      const bookdId = parseId(req.params.id); // bookId
      const orderData = req.body;

      const placedOrder = await orderService.placeOrder(userId, bookdId, orderData);

      return res.status(200).json({message: "Order placed successfully!" , success: true, data: placedOrder})
    } catch (error) {
        next(error);
    }
  }
}

export const orderController = new OrderController();