import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/', bicycleController.createBicycle);
bicycleRouter.get('/', bicycleController.getAllBicycles);
bicycleRouter.get('/:productId', bicycleController.getSingleBicycle);

export default bicycleRouter;
