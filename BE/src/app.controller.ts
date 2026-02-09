import cookieParser from "cookie-parser";
import sequelize, { connectDB } from "./DB/connection.ts";
import * as models from "./DB/index.ts";
import { errorHandler } from "./ExceptionHandler/ErrorHandler.ts";
import { bookRouter, orderRouter, userRouter } from "./modules/index.ts";
import { limiter } from "./utils/limiter/limiter.ts";
import { Request, Response } from "express";

function bootstrap(app: any, express: any): void {
  // Rate limiter
  app.use(limiter);

  // Parse data from request body
  app.use(express.json());

  // To connect database
  connectDB();

  // Sync models to database
  sequelize.sync();

  // Cookies
  app.use(cookieParser());

  // Route to test health
  app.get("/health", (req: Request, res: Response) =>
    res.status(200).json({ message: "Healthy", timestamp: Date.now() })
  );

  // Routes
  app.use("/users", userRouter);
  app.use("/book", bookRouter);
  app.use("/order", orderRouter);

  // Global error handler
  app.use(errorHandler);
}

export default bootstrap;
