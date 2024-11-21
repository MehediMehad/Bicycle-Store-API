import { model, Schema } from 'mongoose';

const bicycleSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'BMX'],
        required: true
    },
    description: { type: String },
    quantity: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true }
});

const Bicycle = model('Bicycle', bicycleSchema);
export default Bicycle;
