import { Request, Response } from 'express';
import { OrderServices } from './oder.service';

const createOrder = async (req: Request, res: Response) => {
    try {
        const { order: orderData } = req.body;
        const result = await OrderServices.createOrderDB(orderData);

        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result
        });
    } catch (error) {
        console.log(error);
    }
};

//
export const orderController = {
    createOrder
};
