import sequelize from "../../DB/connection";
import Book from "../../DB/models/book.model";
import Order from "../../DB/models/orders_model";
import User from "../../DB/models/user.model";
import {
  BadRequestError,
  ResourceNotFoundError,
} from "../../ExceptionHandler/customError";
import { CreateOrderDTO, OrderResponseDTO, OrderStatus } from "./order.dto";

export class OrderService {
  async placeOrder(
    userId: number,
    items: { bookId: number; quantity: number }[],
  ): Promise<OrderResponseDTO[]> {
    // Return array of orders

    // create transaction
    const transaction = await sequelize.transaction();

    try {
      const orders: OrderResponseDTO[] = [];

      for (const item of items) {
        const book = await Book.findByPk(item.bookId, { transaction });

        if (!book) {
          throw new ResourceNotFoundError(`Book: ${item.bookId} not found!`);
        }

        const currentStock = book.getDataValue("stock");

        if (currentStock < item.quantity) {
          throw new BadRequestError(
            `Insufficient stock for book ${item.bookId}`,
          );
        }

        const priceAtPurchase = item.quantity * book.getDataValue("price");

        // Update stock
        await book.update(
          { stock: currentStock - item.quantity },
          { transaction },
        );

        // Create order WITH transaction
        const order = await Order.create(
          {
            user_id: userId,
            book_id: item.bookId,
            status: OrderStatus.PENDING,
            quantity: item.quantity,
            price_at_purchase: priceAtPurchase,
          },
          { transaction },
        );

        orders.push({
          user_id: userId,
          book_id: item.bookId,
          status: OrderStatus.PENDING,
          quantity: item.quantity,
          price_at_purchase: priceAtPurchase,
        });
      }

      // Commit transaction - all succeeded
      await transaction.commit();

      return orders;
    } catch (error) {
      // Rollback - something failed
      await transaction.rollback();
      throw error;
    }
  }

  async deleteOrder(id: number): Promise<number> {
    const existingOrder = await Order.findByPk(id);

    if (!existingOrder) throw new ResourceNotFoundError("Order doesn't exist!");

    existingOrder.destroy();

    return id;
  }
}

export const orderService = new OrderService();
