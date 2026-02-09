import { NextFunction, Request, Response } from "express";
import User from "../../DB/models/user.model.ts";
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "../../utils/jwt/jwt.ts";
import { ResourceNotFoundError } from "../../ExceptionHandler/customError.ts";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

interface JwtPayload {
  id: number;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "No token provided, Access denied." });
    }

    let decoded: JwtPayload;

    try {
      // Try to verify access token
      decoded = verifyAccessToken(accessToken) as JwtPayload;
    } catch (accessError) {
      // Access token expired or invalid, try refresh token
      if (!refreshToken) {
        return res.status(401).json({ message: "Access token expired. Please refresh." });
      }

      try {
        decoded = verifyRefreshToken(refreshToken) as JwtPayload;
        
        // Generate new access token
        const newAccessToken = generateAccessToken(decoded.id);
        
        // Set new access token cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });
      } catch (refreshError) {
        return res.status(401).json({ message: "Session expired. Please login again." });
      }
    }

    // Get user from DB
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    // Assign user to request
    req.user = {
      id: user.getDataValue("id"),
      role: user.getDataValue("role"),
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token. Access denied!" });
  }
};
