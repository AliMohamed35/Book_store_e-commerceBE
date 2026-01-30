import Book from "../../DB/models/book.model";
import Order from "../../DB/models/orders_model";
import User from "../../DB/models/user.model";
import { ResourceNotFoundError } from "../../ExceptionHandler/customError";
import { CreateOrderDTO, OrderResponseDTO, OrderStatus } from "./order.dto";

export class OrderService {
  async placeOrder(userId: number, bookId: number, orderData: CreateOrderDTO): Promise<OrderResponseDTO> {
    // check user existence
    const existingUser = await User.findByPk(userId);
    if (!existingUser) throw new ResourceNotFoundError();

    // check book existence
    const existingBook = await Book.findByPk(bookId);
    if (!existingBook) throw new ResourceNotFoundError();

    const createdOrder = await Order.create({
      user_id: userId,
      book_id: bookId,
      status: OrderStatus.PENDING,
      quantity: orderData.quantity,
      price_at_purchase: existingBook.getDataValue("price") * orderData.quantity,
    });

    return {
      user_id: userId,
      book_id: bookId,
      status: OrderStatus.PENDING,
      quantity: orderData.quantity,
      priceAtPurchase: existingBook.getDataValue("price") * orderData.quantity,
    };
  }
}

export const orderService = new OrderService();
