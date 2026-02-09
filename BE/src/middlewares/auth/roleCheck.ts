import type { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorizeRoles = (...allowedRoles: string[]) =>{
    return (req: AuthRequest, res: Response, next: NextFunction) =>{
        const userRole = req.user?.role;

        if(!userRole || !allowedRoles.includes(userRole)){
            return res.status(403).json({message:"Access denied. Insufficient permissions."})
        }

        next();
    }
}