import User from "../DB/models/user.model.ts"
import Book from "../DB/models/book.model.ts"
import Order from "../DB/models/orders_model.ts"

User.hasMany(Order, { foreignKey: "user_id", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id" });

export { User, Book, Order };
