import { NextFunction, Request, Response } from "express";
import joi, { ObjectSchema, required } from "joi";

export const validate =
  (schema: ObjectSchema, property: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Error!",
        errors: error.details.map((d) => d.message),
      });
    }

    req[property] = value;
    next();
  };

export const joiUserSchema = joi.object({
  name: joi.string().min(3).max(20).required(),

  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?!.*\\s).{3,30}$",
      ),
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one special character, and no spaces",
    }),

  address: joi.string().max(50).required(),

  phone_number: joi.string().min(8).max(15),

  role: joi.string().valid("CUSTOMER", "ADMIN").required(),
});

export const joiResetPassword = joi.object({
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?!.*\\s).{3,30}$",
      ),
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one special character, and no spaces",
    }),

  newPassword: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?!.*\\s).{3,30}$",
      ),
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one special character, and no spaces",
    }),
});

export const joiUpdateBook = joi.object({
  book_name: joi.string().optional().min(15).max(30),
  description: joi.string().max(50).min(20).optional(),
  price: joi.number().positive().optional(),
  stock: joi.number().min(0).integer().optional(),
})

export const joiAddBook = joi.object({
  book_name: joi.string().min(15).max(30).required(),
  description: joi.string().max(50).min(10).required(),
  price: joi.number().positive().required(),
  stock: joi.number().min(0).integer().required(),
})