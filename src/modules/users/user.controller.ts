import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

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

}

export const userController = new UserController();
