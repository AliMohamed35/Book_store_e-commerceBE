import User, { UserAttributes } from "../../DB/models/user.model.ts";
import {
  BadRequestError,
  InvalidCredentialsError,
  ResourceNotFoundError,
  UserAlreadyExistError,
} from "../../ExceptionHandler/customError.ts";
import { comparePassword, hashPassword } from "../../utils/hash/hash.ts";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt/jwt.ts";
import logger from "../../utils/logs/logger.ts";
import {
  CreateUserDTO,
  DeleteDTO,
  LoginDTO,
  LoginResponseDTO,
  LogoutDTO,
  ResetPasswordDTO,
  ResetPasswordResponseDTO,
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
    if (existingUser.getDataValue("isDeleted") === true)
      existingUser.set("isDeleted", false);
    existingUser.set("isActive", true);

    // Generate both tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Hash and store refresh token in DB
    const hashedRefreshToken = await hashPassword(refreshToken);
    existingUser.set("refreshToken", hashedRefreshToken);

    // Save user record
    await existingUser.save();

    logger.info(`Logged in user: ${userData.email}`);

    return {
      email: user.email,
      accessToken,
      refreshToken,
    };
  }

  async logout(email: string): Promise<LogoutDTO> {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      throw new ResourceNotFoundError("User Not found!");
    }

    existingUser.set("isActive", false);
    existingUser.set("refreshToken", null);  // Clear refresh token

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

  async resetPassword(
    id: number,
    userData: ResetPasswordDTO,
  ): Promise<ResetPasswordResponseDTO> {
    const existingUser = await User.findByPk(id);

    if (!existingUser) throw new ResourceNotFoundError("User doesn't exist!");

    // compare the password with the password of account
    const match = await comparePassword(
      userData.password,
      existingUser.getDataValue("password"),
    );

    if (!match) throw new BadRequestError("Password doesn't match");

    // compare the password with the old password of account
    const oldPasswordCheck = await comparePassword(
      userData.newPassword,
      existingUser.getDataValue("password"),
    );

    if (oldPasswordCheck)
      throw new BadRequestError("New password can't be same as old one!");

    const hashedPassword = await hashPassword(userData.newPassword);

    existingUser.set("password", hashedPassword);

    await existingUser.save();

    return {
      email: existingUser.getDataValue("email"),
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // verify the refresh token
    const decoded = verifyRefreshToken(refreshToken) as { id: number };
    const existingUser = await User.findByPk(decoded.id);

    if (!existingUser) throw new ResourceNotFoundError("User not found!");

    // Verify refresh token matches the one in DB
    const storedRefreshToken = existingUser.getDataValue("refreshToken");

    if (!storedRefreshToken) {
      throw new BadRequestError("No refresh token found. Please login again.");
    }

    const isValidRefresh = await comparePassword(
      refreshToken,
      storedRefreshToken,
    );

    if (!isValidRefresh) {
      throw new BadRequestError("Invalid refresh token. Please login again.");
    }

    // Generate new tokens (token rotation)
    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    const hashedNewRefreshToken = await hashPassword(newRefreshToken);
    existingUser.set("refreshToken", hashedNewRefreshToken);
    await existingUser.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export const userService = new UserService();
