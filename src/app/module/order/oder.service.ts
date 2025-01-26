import { TOrder } from './order.interface';
import Order from './order.model';

// Function to create a new order in the database
const createOrderDB = async (order: TOrder) => {
    const result = await Order.create(order);
    return result;
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
    calculateRevenueDB
};
