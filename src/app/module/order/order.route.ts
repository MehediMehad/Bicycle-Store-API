import auth from '../../Middleware/auth';
import { orderController } from './order.controller';
import express from 'express';

const router = express.Router();

router.post('/', auth('customer'), orderController.createOrder);
router.get(
    '/revenue',
    auth('customer'),
    orderController.getAndCalculateRevenue
);

export const OrderRouter = router;
