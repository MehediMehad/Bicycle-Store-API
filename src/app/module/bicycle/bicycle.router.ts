import validateRequest from '../../Middleware/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { bicycleController } from './bicycle.controller';
import express, { NextFunction, Request, Response } from 'express';
import { bicycleValidationSchema } from './bicycle.validation';

const router = express.Router();

router.post(
    '/',
    // auth('admin'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(bicycleValidationSchema.createBicycleValidationSchema),
    bicycleController.createBicycle
);
router.get('/', bicycleController.getAllBicycles);
router.get('/:productId', bicycleController.getSingleBicycle);
router.put(
    '/:productId',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    // validateRequest(bicycleValidationSchema.updateBicycleValidationSchema),
    bicycleController.updateBicycleDetailsById
);
router.delete('/:productId', bicycleController.deleteBicycleDetailsById);

export const BicycleRouter = router;
