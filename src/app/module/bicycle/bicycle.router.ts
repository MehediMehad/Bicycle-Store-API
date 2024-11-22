import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/', bicycleController.createBicycle);
bicycleRouter.get('/', bicycleController.getAllBicycles);

export default bicycleRouter;
