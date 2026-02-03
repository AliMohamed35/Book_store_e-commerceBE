import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const limiter = rateLimit({
    windowMs: 60 * 1000, // request every 1 min
    max: 3,
    handler: (req: Request, res: Response) => {
      throw new Error("rate limit exceeded");
    },
    skipSuccessfulRequests: true,

  });
