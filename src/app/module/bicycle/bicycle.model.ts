import { model, Schema } from 'mongoose';
import { TBicycle } from './bicycle.interface';

const bicycleSchema = new Schema<TBicycle>(
    {
        name: { type: String, required: [true, 'Name is required'] },
        brand: { type: String, required: [true, 'Brand is required'] },
        price: { type: Number, required: [true, 'Price is required'] },
        type: {
            type: String,
            enum: {
                values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
                message:
                    '{VALUE} is not a valid bike type. Please choose from: Mountain, Road, Hybrid, BMX, or Electric.'
            },
            required: [true, 'Bike type is required.']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        quantity: { type: Number, required: [true, 'Quantity is required'] },
        inStock: { type: Boolean, required: [true, 'inStock is required'] }
    },
    { timestamps: true }
);

const BicycleModel = model<TBicycle>('Bicycle', bicycleSchema);

export default BicycleModel;
