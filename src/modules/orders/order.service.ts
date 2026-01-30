// import Order from "../../DB/models/orders_model";
// import User from "../../DB/models/user.model";
// import { ResourceNotFoundError } from "../../ExceptionHandler/customError";
// import { OrderResponseDTO } from "./order.dto";

// export class OrderService{
//     async placeOrder(id: number, userData: string): Promise<OrderResponseDTO>{
//         // Check book existence
//         const existingBook = await Order.findOne({where:{id}})
        
//         // Check user existence
//         const existingUser = await User.findOne({where: {userData.email}})
//         if(!existingBook) throw new ResourceNotFoundError("Book doesn't exist!");

//         const placedOrder = await Order.create({
//             user_id: 
//         })
//     }
// }