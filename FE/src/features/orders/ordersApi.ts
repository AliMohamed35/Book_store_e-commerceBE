import api from "../../services/api";
import type { Order, OrderItem } from "./types";

export const ordersApi = {
    addOrder: async(items: OrderItem[]): Promise<Order[]> =>{
        const response = await api.post("/order", items);
        return response.data.data;
    }
}