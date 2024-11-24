import { NextFunction, Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';

// Create a new Bicycle
const createBicycle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const bicycleData = req.body;
        const result = await BicycleServices.createBicycleDB(bicycleData);

        res.status(200).json({
            success: true,
            message: 'Bicycle created successfully!',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

// Call the service function to fetch all bicycles, with optional search filter
const getAllBicycles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { searchTerm } = req.query;
        const result = await BicycleServices.getAllBicyclesFromDB(
            searchTerm as string
        );

        res.status(200).json({
            success: true,
            message: 'Bicycles retrieved successfully!',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

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

// Update a Bicycle's details by ID
const updateBicycleDetailsById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productId } = req.params;
        const bicycle = req.body;
        const result = await BicycleServices.updateBicycleByIdFromDB(
            productId,
            bicycle
        );

        res.status(200).json({
            success: true,
            message: 'Bicycle updated successfully!',
            data: result
        });
    } catch (err) {
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
    } catch (err) {
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
