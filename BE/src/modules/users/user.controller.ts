import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { parseId } from "../../utils/parse/parseId";
import { AuthRequest } from "../../middlewares/auth/auth.middleware";
import { verifyRefreshToken } from "../../utils/jwt/jwt";
import User from "../../DB/models/user.model";

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
      const result = await userService.login(userData);

      // Set access token cookie
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      // Set refresh token cookie
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        success: true,
        email: result.email,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // Try to get user from token (but don't fail if expired)
      const refreshToken = req.cookies?.refreshToken;

      // Clear cookies
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      if (refreshToken) {
        try {
          const decoded = verifyRefreshToken(refreshToken) as { id: number };

          // Clear refresh token from database
          const user = await User.findByPk(decoded.id);
          if (user) {
            user.set("isActive", false);
            user.set("refreshToken", null);
            await user.save();
          }
        } catch (error) {
          // Token expired or invalid - that's OK, just continue
          // We already cleared the cookies, which is the main goal
        }
      }

      return res.status(200).json({
        message: "User logged out successfully!",
        success: true,
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
      const user = await userService.getUserById(parseId(id));

      return res.status(200).json({
        message: "User retrieved successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 1;

      const result = await userService.getAllUsers(page, limit);
      return res.status(200).json({
        message: "Users retrieved successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAllUserField(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.user!.id;
      const data = req.body;
      const updatedUser = await userService.updateAllUserField(id, data);

      return res.status(200).json({
        message: "User retrieved successfully",
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user!.id;
      const data = req.body;

      await userService.resetPassword(id, data);

      return res
        .status(200)
        .json({ message: "Password is reset successfully!", success: true });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token not provided" });
      }

      const tokens = await userService.refreshToken(refreshToken);

      // Set new cookies
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const verifiedUser = await userService.verifyUser(email, otp);

      return res.status(200).json({
        message: "User verified successfully",
        success: true,
        data: verifiedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
