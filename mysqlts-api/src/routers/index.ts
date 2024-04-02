import express, { Router } from 'express';
import PassangerRouter from './PassangerRouter';

const router = Router();
// Body Parser: Mengambil Req.Body dari client
router.use(express.json())

router.use('/passangers', PassangerRouter);

export default router;