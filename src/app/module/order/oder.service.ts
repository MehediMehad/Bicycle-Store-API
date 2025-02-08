import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';
import Bicycle from '../bicycle/bicycle.model';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

// Function to create a new order in the database
const createOrderDB = async (
    userJwt: JwtPayload,
    payload: TOrder,
    client_ip: string
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.isUserExistsByEmail(userJwt.userEmail);
        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
        }

        const bicycle = await Bicycle.findById(payload.product).session(
            session
        );
        if (!bicycle) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
        }

        if (bicycle.quantity < payload.quantity) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Insufficient stock');
        }

        bicycle.quantity -= payload.quantity;
        bicycle.inStock = bicycle.quantity > 0;
        bicycle.availability =
            bicycle.quantity > 0 ? 'In Stock' : 'Out of Stock';
        await bicycle.save({ session });

        const order = await Order.create(
            [
                {
                    email: payload.email,
                    product: payload.product,
                    quantity: payload.quantity,
                    totalPrice: payload.totalPrice
                }
            ],
            { session }
        );

        // Payment integration
        const shurjopayPayload = {
            amount: order[0].totalPrice,
            order_id: order[0].product,
            currency: 'BDT',
            customer_name: user.name,
            customer_address: 'N/A',
            customer_email: user.email,
            customer_phone: 'N/A',
            customer_city: 'N/A',
            client_ip
        };

        const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

        if (!payment?.transactionStatus) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Payment Failed');
        }

        await Order.updateOne(
            { _id: order[0]._id },
            {
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus
                }
            },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return payment.checkout_url;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getOrders = async () => {
    const data = await Order.find();
    return data;
};
// Get Single Order
const getSingleOrder = async (productId: string) => {
    const result = await Bicycle.findById({ _id: productId });
    if (!result) {
        throw new Error('Product not found');
    }
    return result;
};
const getMyOrderFromDB = async (email: Record<string, unknown>) => {
    const result = await Order.find(email);

    return result;
};
const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
    console.log(verifiedPayment);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                'transaction.id': order_id
            },
            {
                'transaction.bank_status': verifiedPayment[0].bank_status,
                'transaction.sp_code': verifiedPayment[0].sp_code,
                'transaction.sp_message': verifiedPayment[0].sp_message,
                'transaction.transactionStatus':
                    verifiedPayment[0].transaction_status,
                'transaction.method': verifiedPayment[0].method,
                'transaction.date_time': verifiedPayment[0].date_time,
                status:
                    verifiedPayment[0].bank_status == 'Success'
                        ? 'Paid'
                        : verifiedPayment[0].bank_status == 'Failed'
                          ? 'Pending'
                          : verifiedPayment[0].bank_status == 'Cancel'
                            ? 'Cancelled'
                            : ''
            }
        );
    }

    return verifiedPayment;
};

// Function to calculate total revenue from all orders in the database
const calculateRevenueDB = async () => {
    // Use Mongoose's `aggregate` method to perform an aggregation operation
    const result = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' }
            }
        }
    ]);

    // Return the total revenue, or 0 if no orders exist
    return result.length > 0 ? result[0].totalRevenue : 0;
};

// Export the services so they can be used in the controller or elsewhere
export const OrderServices = {
    createOrderDB,
    calculateRevenueDB,
    getSingleOrder,
    getOrders,
    verifyPayment,
    getMyOrderFromDB
};
