import { TOrder } from './order.interface';
import OrderModel from './order.model';

const createOrderDB = async (order: TOrder) => {
    const result = await OrderModel.create(order);
    return result;
};
const calculateRevenueDB = async () => {
    const result = await OrderModel.aggregate([
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

export const OrderServices = {
    createOrderDB,
    calculateRevenueDB
};
