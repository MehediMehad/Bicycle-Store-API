import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './oder.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createOrder = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await OrderServices.createOrderDB(user, req.body, req.ip!);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Order placed successfully',
        success: true,
        data: result
    });
});

const getOrders = catchAsync(async (req, res) => {
    const order = await OrderServices.getOrders();

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Order retrieved successfully',
        data: order
    });
});

const verifyPayment = catchAsync(async (req, res) => {
    const order = await OrderServices.verifyPayment(
        req.query.order_id as string
    );

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Order verified successfully',
        data: order
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
    getAndCalculateRevenue,
    getOrders,
    verifyPayment
};
