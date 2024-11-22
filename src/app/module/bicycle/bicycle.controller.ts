import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
    try {
        const { bicycle: bicycleData } = req.body;
        const result = await BicycleServices.createBicycleDB(bicycleData);

        res.status(200).json({
            success: true,
            message: 'Bicycle created successfully!',
            data: result
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllBicycles = async (req: Request, res: Response) => {
    try {
        const result = await BicycleServices.getAllBicyclesFromDB();

        res.status(200).json({
            success: true,
            message: 'Bicycles retrieved successfully!',
            data: result
        });
    } catch (err) {
        console.log(err);
    }
};

//
export const bicycleController = {
    createBicycle,
    getAllBicycles
};
