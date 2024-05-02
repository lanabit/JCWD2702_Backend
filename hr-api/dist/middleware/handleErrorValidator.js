"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorValiadator = void 0;
const express_validator_1 = require("express-validator");
const handleErrorValiadator = (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    console.log(errorResult);
    if (!errorResult.isEmpty()) {
        res.status(300).send({
            error: true,
            message: errorResult.array()[0].msg,
            data: null
        });
    }
    else {
        next();
    }
};
exports.handleErrorValiadator = handleErrorValiadator;
