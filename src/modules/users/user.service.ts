import User, { UserAttributes } from "../../DB/models/user.model.ts";
import {
  BadRequestError,
  InvalidCredentialsError,
  ResourceNotFoundError,
  UserAlreadyExistError,
} from "../../ExceptionHandler/customError.ts";
import { comparePassword, hashPassword } from "../../utils/hash/hash.ts";
import { generateJWT } from "../../utils/jwt/jwt.ts";
import logger from "../../utils/logs/logger.ts";
import {
  CreateUserDTO,
  DeleteDTO,
  LoginDTO,
  LoginResponseDTO,
  LogoutDTO,
  UpdatedDTO,
  UserResponseDTO,
} from "../users/user.dto.ts";

export class UserService {
  async register(userData: CreateUserDTO): Promise<UserResponseDTO> {
    // Check user Existence
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new UserAlreadyExistError("User already exists!");
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Convert to entity >> DB
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      isActive: false,
      isDeleted: false,
    });

    logger.info(`User created: ${newUser}`);

    return {
      name: newUser.getDataValue("name"),
      email: newUser.getDataValue("email"),
      address: newUser.getDataValue("address"),
    };
  }

  async login(userData: LoginDTO): Promise<LoginResponseDTO> {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });

    if (!existingUser) throw new ResourceNotFoundError("User not found!");

    const user = existingUser.toJSON() as UserAttributes;

    if (user.isActive) throw new BadRequestError("User already logged in!");
    const comparedPassword = await comparePassword(
      userData.password,
      user.password,
    );

    if (!comparedPassword) throw new InvalidCredentialsError();
    if (existingUser.getDataValue("isDeleted") === true) existingUser.set("isDeleted", false);
    existingUser.set("isActive", true);

    const token = generateJWT(user.id);

    // Save user record
    await existingUser.save();

    logger.info(`Logged in user: ${userData.email}`);

    return {
      email: user.email,
      token,
    };
  }

  async logout(email: string): Promise<LogoutDTO> {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      throw new ResourceNotFoundError("User Not found!");
    }

    existingUser.set("isActive", false);

    await existingUser.save();

    logger.info(`Logged out user: ${email}`);

    return {
      email,
    };
  }

  async softDelete(id: number): Promise<DeleteDTO> {
    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      throw new ResourceNotFoundError("User doesn't exist!");
    }
    if (existingUser.getDataValue("isDeleted") == true) {
      throw new BadRequestError("User already soft deleted!");
    }

    existingUser.set("isDeleted", true);
    existingUser.set("isActive", false);
    await existingUser.save();

    return {
      email: existingUser.getDataValue("email"),
    };
  }

  async deleteUser(id: number): Promise<void> {
    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      throw new ResourceNotFoundError("User doesn't exist!");
    }

    await existingUser.destroy();
  }

  async getUserById(id: number): Promise<UserResponseDTO> {
    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      throw new ResourceNotFoundError("User doesn't exist!");
    }

    return {
      name: existingUser.getDataValue("name"),
      email: existingUser.getDataValue("email"),
      address: existingUser.getDataValue("address"),
    };
  }

  async getAllUsers(): Promise<UserAttributes[]> {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ["password"] },
    });

    if (users.length === 0) {
      throw new ResourceNotFoundError("No users found in the database!");
    }

    // return users.map(user => user.toJSON() as UserAttributes);
    return users as unknown as UserAttributes[];
  }

  async updateAllUserField(
    id: number,
    userData: Partial<UpdatedDTO>,
  ): Promise<UpdatedDTO> {
    const existingUser = await User.findByPk(id);

    if (!existingUser) throw new ResourceNotFoundError("User doesn't exist!");

    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    existingUser.update(userData);

    return {
      name: existingUser.getDataValue("name"),
      email: existingUser.getDataValue("email"),
      password: existingUser.getDataValue("password"),
      address: existingUser.getDataValue("address"),
      phone_number: existingUser.getDataValue("phone_number"),
    };
  }
}

export const userService = new UserService();
