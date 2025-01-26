import { Router } from 'express';
import { BicycleRouter } from '../module/bicycle/bicycle.router';
import { OrderRouter } from '../module/order/order.route';

const router = Router();

const modulesRouter = [
    {
        path: '/products',
        route: BicycleRouter
    },
    {
        path: '/orders',
        route: OrderRouter
    }
];

modulesRouter.forEach(route => router.use(route.path, route.route));

export default router;
