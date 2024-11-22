import { TOrder } from './order.interface';
import OrderModel from './order.model';

const createOrderDB = async (oder: TOrder) => {
    const result = await OrderModel.create(oder);
    return result;
};

export const OrderServices = {
    createOrderDB
};
