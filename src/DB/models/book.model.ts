import { DataTypes } from "sequelize";
import sequelize from "../../DB/connection.ts";

export interface BookAttributes{
  id: number,
  bookName: string,
  description: string,
  price: number,
  stock: number
}

const Book = sequelize.define(
  "Book",
  {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "Book",
    timestamps: true,
    underscored: true,
  },
);


export default Book;
