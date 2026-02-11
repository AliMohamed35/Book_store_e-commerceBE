export const OrderStatus = {
  PENDING: "Pending",
  ON_THE_WAY: "On The way",
  DELIVERED: "Delivered",
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

export interface Order {
  id?: number;
  user_id: number;
  book_id: number;
  quantity: number;
  price_at_purchase: number;
  status: OrderStatusType;
}

// Item to add to cart/order
export interface OrderItem {
  bookId: number;
  quantity: number;
}