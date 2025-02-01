import { bicycleController } from './bicycle.controller';
import express from 'express';

const router = express.Router();

router.post('/', bicycleController.createBicycle);
router.get('/', bicycleController.getAllBicycles); // TODO: Remove Auth
router.get('/:productId', bicycleController.getSingleBicycle);
router.put('/:productId', bicycleController.updateBicycleDetailsById);
router.delete('/:productId', bicycleController.deleteBicycleDetailsById);

export const BicycleRouter = router;
