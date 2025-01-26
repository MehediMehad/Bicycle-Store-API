import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
            // select: 0
        },
        role: {
            type: String,
            enum: ['admin', 'customer']
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked']
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const User = model<TUser>('User', userSchema);
