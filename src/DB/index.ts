import User from "../DB/models/user.model.ts"
import Book from "../DB/models/book.model.ts"
import Order from "../DB/models/orders_model.ts"
import OrderItem from "../DB/models/order_item.ts"

User.hasMany(Order, { foreignKey: "user_id", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Book.hasMany(OrderItem, { foreignKey: "book_id" });
OrderItem.belongsTo(Book, { foreignKey: "book_id" });

export { User, Book, Order, OrderItem };