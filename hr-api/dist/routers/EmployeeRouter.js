"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Define Router
const router = (0, express_1.Router)();
// Import Controller
const EmployeeController_1 = require("../controllers/EmployeeController");
const token_1 = require("../helpers/token");
const uploader_1 = require("../middleware/uploader");
router.get("/all", EmployeeController_1.getAllEmployees);
router.post("/clockin", token_1.tokenVerify, EmployeeController_1.clockin);
router.put("/clockout", EmployeeController_1.clockout);
router.post("/leave-request", EmployeeController_1.leaveRequest);
router.get("/position", EmployeeController_1.employeePosition);
router.get("/shift-position", EmployeeController_1.employeeShiftandPosition);
router.post("/profile", token_1.tokenVerify, uploader_1.uploader, EmployeeController_1.createProfile);
router.put("/profile", token_1.tokenVerify, uploader_1.uploader, EmployeeController_1.updateProfile);
exports.default = router;
