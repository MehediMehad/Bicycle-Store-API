import { Router } from 'express';
import { BicycleRouter } from '../module/bicycle/bicycle.router';
import { OrderRouter } from '../module/order/order.route';
import { UserRouter } from '../module/user/user.route';
import { AuthRouter } from '../module/auth/auth.route';

const router = Router();

const modulesRouter = [
    {
        path: '/products',
        route: BicycleRouter
    },
    {
        path: '/orders',
        route: OrderRouter
    },
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    }
];

modulesRouter.forEach(route => router.use(route.path, route.route));

export default router;
