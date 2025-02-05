import { model, Schema } from 'mongoose';
import { TOrder as TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
    {
        email: {
            type: String,
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
            required: [true, 'Quantity is required'],
            default: 0
        },
        totalPrice: {
            type: Number,
            default: 0,
            min: [0, 'Total price cannot be negative']
        },
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
            default: 'Pending'
        },
        transaction: {
            id: String,
            transactionStatus: String,
            bank_status: String,
            sp_code: String,
            sp_message: String,
            method: String,
            date_time: String
        }
    },
    { timestamps: true }
);

const Order = model<TOrder>('Order', orderSchema);

export default Order;
