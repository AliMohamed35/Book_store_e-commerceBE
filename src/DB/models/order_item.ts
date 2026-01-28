import { DataTypes } from "sequelize";
import sequelize from "../../DB/connection.ts";

const OrderItem = sequelize.define(
  "Order_item",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceAtPurchase: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "order_item",
    timestamps: true,
    underscored: true,
  },
);

export default OrderItem;
