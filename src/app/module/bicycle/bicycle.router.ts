import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/', bicycleController.createBicycle);
bicycleRouter.get('/', bicycleController.getAllBicycles);
bicycleRouter.get('/:productId', bicycleController.getSingleBicycle);
bicycleRouter.put('/:productId', bicycleController.updateBicycleDetailsById);
bicycleRouter.delete('/:productId', bicycleController.deleteBicycleDetailsById);

export default bicycleRouter;
