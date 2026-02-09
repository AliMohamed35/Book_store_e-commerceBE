import type { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  EmailSendError,
  InvalidCredentialsError,
  ResourceNotFoundError,
  UserAlreadyExistError,
} from "./customError.ts";
import logger from "../utils/logs/logger.ts";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    logger.error(`Error after response ${error.name}: ${error.message}`);
    return next(error);
  }

  if (error instanceof UserAlreadyExistError) {
    return res
      .status(400)
      .json({
        message: "User Already Exist",
        success: false,
        error: error.message,
      });
  }

  if (error instanceof ResourceNotFoundError) {
    return res
      .status(404)
      .json({
        message: "User Not found!",
        success: false,
        error: error.message,
      });
  }

  if (error instanceof InvalidCredentialsError) {
    return res
      .status(400)
      .json({
        message: "Invalid credentials!",
        success: false,
        error: error.message,
      });
  }

  if (error instanceof BadRequestError) {
    return res
      .status(400)
      .json({ message: "Bad Request!", success: false, error: error.message });
  }

  if (error instanceof EmailSendError) {
    return res
      .status(400)
      .json({
        message: "Email not sent!",
        success: false,
        error: error.message,
      });
  }

  logger.error(`${error.name}: ${error.message}`);

  return res
    .status(505)
    .json({ success: false, message: "Internal server error" });
};
