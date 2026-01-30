import { DataTypes } from "sequelize";
import sequelize from "../../DB/connection.ts";

const Order = sequelize.define(
  "Order",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ON_THE_WAY", "DELIVERED"),
      allowNull: false,
    },
  },
  {
    tableName: "Order",
    timestamps: true,
    underscored: true,
  },
);

export default Order;
