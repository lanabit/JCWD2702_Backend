import { Router } from "express";

// Define Router
const router = Router();

// Import Controller
import {
  clockin,
  clockout,
  getAllEmployees,
  leaveRequest,
  employeePosition,
  employeeShiftandPosition,
  createProfile,
  updateProfile,
} from "../controllers/EmployeeController";

import { tokenVerify } from "../helpers/token";
import { uploader } from "../middleware/uploader";

router.get("/all", getAllEmployees);
router.post("/clockin", tokenVerify, clockin);
router.put("/clockout", clockout);
router.post("/leave-request", leaveRequest);
router.get("/position", employeePosition);
router.get("/shift-position", employeeShiftandPosition);
router.post("/profile", tokenVerify, uploader, createProfile);
router.put("/profile", tokenVerify, uploader, updateProfile);
export default router;
