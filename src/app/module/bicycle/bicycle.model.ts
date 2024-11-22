import { model, Schema } from 'mongoose';
import { TBicycle } from './bicycle.interface';

const bicycleSchema = new Schema<TBicycle>(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        type: {
            type: String,
            enum: ['Mountain', 'Road', 'Hybrid', 'BMX'],
            required: true
        },
        description: { type: String, required: true },
        quantity: { type: Number, default: 0 },
        inStock: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const BicycleModel = model<TBicycle>('Bicycle', bicycleSchema);

export default BicycleModel;
