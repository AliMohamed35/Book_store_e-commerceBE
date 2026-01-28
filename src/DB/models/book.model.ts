import { DataTypes } from "sequelize";
import sequelize from "../../DB/connection.ts";

const Book = sequelize.define(
  "Book",
  {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "Book",
    timestamps: true,
    underscored: true,
  },
);


export default Book;
