import auth from '../../Middleware/auth';
import { orderController } from './order.controller';
import express from 'express';

const router = express.Router();

router.post('/', auth('admin', 'customer'), orderController.createOrder);
router.get('/', auth('admin'), orderController.getOrders);
router.get(
    '/my-orders',
    auth('admin', 'customer'),
    orderController.getMyOrders
);
router.get('/:id', auth('admin', 'customer'), orderController.getOrders);
router.get('/verify', auth('customer', 'admin'), orderController.verifyPayment);

router.get(
    '/revenue',
    auth('customer', 'admin'),
    orderController.getAndCalculateRevenue
);

export const OrderRouter = router;
