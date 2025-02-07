import auth from '../../Middleware/auth';
import { orderController } from './order.controller';
import express from 'express';

const router = express.Router();

router.post('/', auth('admin'), orderController.createOrder);
router.get('/', auth('admin'), orderController.getOrders);
router.get('/verify', auth('customer'), orderController.verifyPayment);

router.get(
    '/revenue',
    auth('customer'),
    orderController.getAndCalculateRevenue
);

export const OrderRouter = router;
