import { model, Schema } from 'mongoose';
import { TBicycle } from './bicycle.interface';

const bicycleSchema = new Schema<TBicycle>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        brand: {
            type: String,
            required: [true, 'Brand is required'],
            trim: true,
            minlength: [2, 'Brand must be at least 2 characters long'],
            maxlength: [50, 'Brand cannot exceed 50 characters']
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
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
            required: [true, 'Description is required'],
            trim: true,
            minlength: [10, 'Description must be at least 10 characters long'],
            maxlength: [300, 'Description cannot exceed 300 characters']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity cannot be less than 1']
        },
        inStock: { type: Boolean, required: [true, 'inStock is required'] }
    },
    { timestamps: true }
);

const BicycleModel = model<TBicycle>('Bicycle', bicycleSchema);

export default BicycleModel;
