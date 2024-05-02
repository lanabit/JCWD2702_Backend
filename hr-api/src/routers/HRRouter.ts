import { Router } from "express";

// Define Router
const router = Router();

// Import Controller
import {
  approvalLeaveRequest,
  createEmployee,
} from "../controllers/HRController";
import { tokenVerify } from "../helpers/token";
import { validatorCreateEmployee } from "../middleware/validatorCreateEmployee";
import { handleErrorValiadator } from "../middleware/handleErrorValidatorCreateEmployee";
router.put("/approval/leave-request/:id", approvalLeaveRequest);
router.post(
  "/employee",
  tokenVerify,
  validatorCreateEmployee,
  handleErrorValiadator,
  createEmployee
);
router.get("/field-data",tokenVerify,validatorCreateEmployee,handleErrorValiadator)

export default router;
