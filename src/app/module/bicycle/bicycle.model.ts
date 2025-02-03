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
        image: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        brand: {
            type: String,
            enum: {
                values: [
                    'Giant',
                    'Trek',
                    'Specialized',
                    'Cannondale',
                    'Scott',
                    'Bianchi',
                    'Merida',
                    'Duranta',
                    'Veloce',
                    'Prince',
                    'Phoenix',
                    'Hero',
                    'Atlas',
                    'Avon'
                ],
                message:
                    '{VALUE} is not a valid bike type. Please choose from: Phoenix, Atlas, Giant, Trek, or Electric.'
            },
            required: [true, 'brand type is required.']
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
        color: {
            type: String,
            enum: {
                values: [
                    'Red',
                    'Blue',
                    'Black',
                    'White',
                    'Green',
                    'Yellow',
                    'Gray'
                ],
                message:
                    '{VALUE} is not a valid bike type. Please choose from: Black, Blue, White, Gray, or Electric.'
            },
            required: [true, 'Bike color is required.']
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

const Bicycle = model<TBicycle>('Bicycle', bicycleSchema);

export default Bicycle;
