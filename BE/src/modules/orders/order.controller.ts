import { Request, NextFunction, Response } from "express";
import { AuthRequest } from "../../middlewares/auth/auth.middleware";
import { parseId } from "../../utils/parse/parseId";
import { orderService } from "./order.service";

export class OrderController {
  async placeOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // userId
      const items = req.body;

      const placedOrder = await orderService.placeOrder(
        userId,
        items,
      );

      return res
        .status(200)
        .json({
          message: "Order placed successfully!",
          success: true,
          data: placedOrder,
        });
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedOrder = await orderService.deleteOrder(parseId(id));

      return res
        .status(200)
        .json({
          message: "order deleted successfully!",
          success: true,
          data: deletedOrder,
        });
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();
