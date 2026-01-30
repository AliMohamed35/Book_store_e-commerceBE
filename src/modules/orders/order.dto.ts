export enum OrderStatus{
    PENDING = "Pending",
    COMPLETED = "Completed",
}
export interface OrderResponseDTO{
    user_id: number,
    book_id: number,
    status: OrderStatus
    quantity: number,
    priceAtPurchase: number
}

export interface CreateOrderDTO{
    user_id: number,
    book_id: number,
    status: OrderStatus
    quantity: number,
}