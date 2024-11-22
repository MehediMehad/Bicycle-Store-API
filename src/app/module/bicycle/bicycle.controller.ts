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

//
export const bicycleController = {
    createBicycle
};
