import { NextFunction, Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// Create a new Bicycle
// const createBicycle2 = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const bicycleData = req.body;
//         const result = await BicycleServices.createBicycleDB(
//             req.file,
//             bicycleData
//         );

//         res.status(200).json({
//             success: true,
//             message: 'Bicycle created successfully!',
//             data: result
//         });
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//         if (err.message) {
//             res.status(500).json({
//                 success: false,
//                 error: err.message || err
//             });
//             return;
//         }
//         next(err);
//     }
// };

const createBicycle = catchAsync(async (req, res) => {
    const bicycleData = req.body;
    const result = await BicycleServices.createBicycleDB(req.file, bicycleData);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Bicycle created successfully!',
        data: result
    });
});
const updateBicycleDetailsById = catchAsync(async (req, res) => {
    const bicycleId = req.params.productId;

    const bicycleData = req.body;
    const result = await BicycleServices.updateBicycleByIdFromDB(
        bicycleId,
        req.file,
        bicycleData
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Bicycle updated successfully!',
        data: result
    });
});
// Call the service function to fetch all bicycles, with optional search filter
const getAllBicycles = catchAsync(async (req, res) => {
    const result = await BicycleServices.getAllBicyclesFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Bicycles retrieved successfully!',
        meta: result.meta,
        data: result.result
    });
});

// Retrieve a single Bicycle by ID
const getSingleBicycle = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { productId } = req.params;
        const result = await BicycleServices.getSingleBicycleFromDB(productId);

        // Send a success response with the list of bicycles
        res.status(200).json({
            success: true,
            message: 'Bicycle retrieved successfully',
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message === 'Product not found') {
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
            return;
        }
        next(err);
    }
};

// Delete a Bicycle by ID
const deleteBicycleDetailsById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productId } = req.params;
        const result = BicycleServices.deleteBicycleByIdFromDB(productId);

        res.status(200).json({
            success: true,
            message: 'Bicycle deleted successfully!',
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message) {
            res.status(500).json({
                success: false,
                error: err.message || err
            });
            return;
        }
        next(err);
    }
};

// Export all the controller methods for use in the routing
export const bicycleController = {
    createBicycle,
    getAllBicycles,
    getSingleBicycle,
    updateBicycleDetailsById,
    deleteBicycleDetailsById
};
