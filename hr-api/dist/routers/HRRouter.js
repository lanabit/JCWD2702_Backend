"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Define Router
const router = (0, express_1.Router)();
// Import Controller
const HRController_1 = require("../controllers/HRController");
const token_1 = require("../helpers/token");
const validatorCreateEmployee_1 = require("../middleware/validatorCreateEmployee");
const handleErrorValidatorCreateEmployee_1 = require("../middleware/handleErrorValidatorCreateEmployee");
router.put("/approval/leave-request/:id", HRController_1.approvalLeaveRequest);
router.post("/employee", token_1.tokenVerify, validatorCreateEmployee_1.validatorCreateEmployee, handleErrorValidatorCreateEmployee_1.handleErrorValiadator, HRController_1.createEmployee);
router.get("/field-data", token_1.tokenVerify, validatorCreateEmployee_1.validatorCreateEmployee, handleErrorValidatorCreateEmployee_1.handleErrorValiadator);
exports.default = router;
