import { NextFunction, Request, Response } from "express";
import User from "../../DB/models/user.model.ts";
import { decodeJWT } from "../../utils/jwt/jwt.ts";
import { ResourceNotFoundError } from "../../ExceptionHandler/customError.ts";

export interface AuthRequest extends Request{
    user?:{
        id: number,
        role: string
    }
}

interface JwtPayload{
    id: number
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;

    if(!token){
        res.status(401).json({message:"No token provided, Access denied."})
    }

    // Verify token using decoded
    const decoded = decodeJWT(token) as JwtPayload;

    // Get user from DB
    const user = await User.findByPk(decoded.id);

    if(!user){
        throw new ResourceNotFoundError();
    }

    // Assign user to request
    req.user ={
        id: user.getDataValue("id"),
        role: user.getDataValue("role")
    }

    next();
    } catch (error) {
        res.status(401).json({message:"Invalid Token. Access denied!"})
    }
}