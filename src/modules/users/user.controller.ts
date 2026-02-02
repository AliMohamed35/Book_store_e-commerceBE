import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { parseId } from "../../utils/parse/parseId";
import { AuthRequest } from "../../middlewares/auth/auth.middleware";

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const createdUser = await userService.register(userData);
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const { email, token } = await userService.login(userData);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "User logged in successfully!",
        success: true,
        data: email,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const loggedOut = await userService.logout(email);

      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "User logged out successfully!",
        success: true,
        data: loggedOut,
      });
    } catch (error) {
      next(error);
    }
  }

  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const softDeleted = await userService.softDelete(parseId(id));

      return res.status(200).json({
        message:
          "User soft deleted successfully, login within 30 days to re-activate account",
        success: true,
        data: softDeleted,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.deleteUser(parseId(id));

      return res.status(200).json({
        message: "User deleted successfully!",
        success: true,
        data: id,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(parseId(id))

      return res.status(200).json({message: "User retrieved successfully", success: true, data: user});
    } catch (error) {}
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({message: "User retrieved successfully", success: true, data: users});
    } catch (error) {
      next(error);
    }
  }

  async updateAllUserField(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user!.id;
      const data = req.body;
      const updatedUser = await userService.updateAllUserField(id, data);

      return res.status(200).json({message: "User retrieved successfully", success: true, data: updatedUser});
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
