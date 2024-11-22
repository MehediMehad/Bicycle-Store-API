import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/api/products', bicycleController.createBicycle);

export default bicycleRouter;
