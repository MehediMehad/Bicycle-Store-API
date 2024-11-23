import { model, Schema } from 'mongoose';
import { TOrder as TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            match: [
                /\S+@\S+\.\S+/,
                '{VALUE} is not valid Please provide a valid email address'
            ]
        },
        product: {
            type: String,
            required: [true, 'Product is required'],
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: [1, 'Quantity must be at least 1']
        },
        totalPrice: {
            type: Number,
            default: 0,
            min: [0, 'Total price cannot be negative']
        }
    },
    { timestamps: true }
);

const OrderModel = model<TOrder>('Order', orderSchema);

export default OrderModel;
