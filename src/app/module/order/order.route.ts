import { orderController } from './order.controller';
import express from 'express';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/revenue', orderController.getAndCalculateRevenue);

export const OrderRouter = router;
