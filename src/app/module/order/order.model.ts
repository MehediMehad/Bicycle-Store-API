import { model, Schema } from 'mongoose';
import { TOrder as TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
    {
        email: { type: String, required: true },
        product: { type: String, required: true },
        quantity: { type: Number, default: 0 },
        totalPrice: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const OrderModel = model<TOrder>('Oder', orderSchema);

export default OrderModel;
