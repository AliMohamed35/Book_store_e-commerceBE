import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../DB/connection.ts";

// Define the attributes interface
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
  role: "CUSTOMER" | "ADMIN";
  isActive: boolean;
  isDeleted: boolean;
  refreshToken: string | null,
  otp: number | null,
  isVerified: boolean
}

// For creation, id is optional (auto-generated)
export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "isActive" | "isDeleted" | "role"
> {}

// Extend the Model class with our types
const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      validate: {
        isEmail: {
          msg: "Valid email must be entered!",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("CUSTOMER", "ADMIN"),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isVerified: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    tableName: "User",
    timestamps: true,
    underscored: true,
  },
);

export default User;
