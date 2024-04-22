import { Router } from 'express';

// Define Router
const router = Router()

// Import Controller
import {clockin} from '../controllers/EmployeeController';

router.post('/', clockin)

export default router