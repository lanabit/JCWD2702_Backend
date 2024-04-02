import { Router } from 'express';
import { findPassangers } from '../controllers/PassangerController';

const router = Router()

router.get('/', findPassangers)

export default router;