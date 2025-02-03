import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './oder.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// // Create Order Controller
// const createOrder2 = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<void> => {
//     try {
//         const { email, product: bicycleId, quantity, totalPrice } = req.body;

//         // Fetch the product from the database to check inventory
//         const bicycle = await Bicycle.findById(bicycleId);

//         if (!bicycle) {
//             res.status(404).json({
//                 success: false,
//                 message: 'Bicycle not found',
//                 error: 'Resource not found'
//             });
//             return;
//         }
//         // Check if enough stock is available
//         if (bicycle.quantity < quantity) {
//             res.status(400).json({
//                 success: false,
//                 message: 'Insufficient stock for the requested quantity',
//                 error: 'Insufficient stock'
//             });
//             return;
//         }

//         // Reduce the quantity in the bicycle model // TODO
//         bicycle.quantity -= quantity;
//         bicycle.inStock = bicycle.quantity > 0;

//         // Save the updated bicycle
//         await bicycle.save();

//         // create the order
//         const orderData = { email, product: bicycleId, quantity, totalPrice };
//         const result = await OrderServices.createOrderDB(orderData, req.ip!);

//         // Respond with the order data
//         res.status(200).json({
//             success: true,
//             message: 'Order created successfully!',
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

const createOrder = catchAsync(async (req, res) => {
    const user = req.user;

    // Fetch the product from the database to check inventory

    // if (!bicycle) {
    //     res.status(404).json({
    //         success: false,
    //         message: 'Bicycle not found',
    //         error: 'Resource not found'
    //     });
    //     return;
    // }
    // // Check if enough stock is available
    // if (bicycle.quantity < quantity) {
    //     res.status(400).json({
    //         success: false,
    //         message: 'Insufficient stock for the requested quantity',
    //         error: 'Insufficient stock'
    //     });
    //     return;
    // }

    // // Reduce the quantity in the bicycle model // TODO
    // bicycle.quantity -= quantity;
    // bicycle.inStock = bicycle.quantity > 0;

    // // Save the updated bicycle
    // await bicycle.save();

    // create the order

    const result = await OrderServices.createOrderDB(user, req.body, req.ip!);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Order placed successfully',
        success: true,
        data: result
    });
});

// Updated getAndCalculateRevenue Controller Function
const getAndCalculateRevenue = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.cookies);
    try {
        const totalRevenue = await OrderServices.calculateRevenueDB();

        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue }
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

export const orderController = {
    createOrder,
    getAndCalculateRevenue
};
