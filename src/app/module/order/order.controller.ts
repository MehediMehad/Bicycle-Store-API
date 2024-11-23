import { Request, Response } from 'express';
import { OrderServices } from './oder.service';
import BicycleModel from '../bicycle/bicycle.model';

const createOrder = async (
    req: Request,
    res: Response,
    next: NewableFunction
) => {
    try {
        const { email, product: bicycleId, quantity, totalPrice } = req.body;

        // Fetch the product from the database to check inventory
        const bicycle = await BicycleModel.findById(bicycleId);

        if (!bicycle) {
            return res.status(404).json({
                success: false,
                message: 'Bicycle not found',
                error: 'Resource not found'
            });
        }
        // Check if enough stock is available
        if (bicycle.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock for the requested quantity',
                error: 'Insufficient stock'
            });
        }

        // Reduce the quantity in the bicycle model // TODO
        bicycle.quantity -= quantity;
        bicycle.inStock = bicycle.quantity > 0;

        // Save the updated bicycle
        await bicycle.save();

        // create the order
        const orderData = { email, product: bicycleId, quantity, totalPrice };
        const result = await OrderServices.createOrderDB(orderData);

        // Respond with the order data
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

//
export const orderController = {
    createOrder
};
