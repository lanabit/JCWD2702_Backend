import express, {Router} from 'express';

// Define Router
const router = Router()
router.use(express.json()) // Body Parser

// Import Admin Router
import EmployeeRouter from './EmployeeRouter';

router.use('/employee', EmployeeRouter)

export default router