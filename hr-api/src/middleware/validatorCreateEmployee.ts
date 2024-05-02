import { Response, Request, NextFunction } from "express";
import { body, check } from "express-validator";

export const validatorCreateEmployee = [
  body(["email", "fullname", "password", "positionId", "shiftId", "address"])
    .notEmpty()
    .withMessage("Missing some fields"),

  body("email").isString().isEmail().withMessage("Email invalid"),

  body("password")
    .isString()
    .isLength({ min: 5, max: 15 })
    .withMessage("Must have 5 - 15 char"),

  body(["positionId", "shiftId"])
    .not()
    .isString()
    .withMessage("Type must be number"),
];
