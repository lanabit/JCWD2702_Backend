"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorCreateEmployee = void 0;
const express_validator_1 = require("express-validator");
exports.validatorCreateEmployee = [
    (0, express_validator_1.body)(["email", "fullname", "password", "positionId", "shiftId", "address"])
        .notEmpty()
        .withMessage("Missing some fields"),
    (0, express_validator_1.body)("email").isString().isEmail().withMessage("Email invalid"),
    (0, express_validator_1.body)("password")
        .isString()
        .isLength({ min: 5, max: 15 })
        .withMessage("Must have 5 - 15 char"),
    (0, express_validator_1.body)(["positionId", "shiftId"])
        .not()
        .isString()
        .withMessage("Type must be number"),
];
