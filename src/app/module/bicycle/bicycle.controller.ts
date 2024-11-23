import { NextFunction, Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';

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

const getAllBicycles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await BicycleServices.getAllBicyclesFromDB();

        res.status(200).json({
            success: true,
            message: 'Bicycles retrieved successfully!',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

// Get Single Bicycle
const getSingleBicycle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productId } = req.params;

        const result = await BicycleServices.getSingleBicycleFromDB(productId);

        res.status(200).json({
            success: true,
            message: 'Bicycle retrieved successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

// Update a Bicycle
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

//
export const bicycleController = {
    createBicycle,
    getAllBicycles,
    getSingleBicycle,
    updateBicycleDetailsById,
    deleteBicycleDetailsById
};
