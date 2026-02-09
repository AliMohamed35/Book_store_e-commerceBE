export enum OrderStatus{
    PENDING = "Pending",
    ON_THE_WAY = "On The way",
    DELIVERED = "Delivered"
}

export interface OrderResponseDTO{
    user_id: number,
    book_id: number,
    status: OrderStatus
    quantity: number,
    price_at_purchase: number
}

export interface CreateOrderDTO{
    user_id: number,
    book_id: number,
    status: OrderStatus
    quantity: number,
}