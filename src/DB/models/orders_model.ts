import { DataTypes } from "sequelize";
import sequelize from "../../DB/connection.ts";

const Order = sequelize.define(
  "Order",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_at_purchase:{
      type: DataTypes.INTEGER,
      allowNull: false
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
