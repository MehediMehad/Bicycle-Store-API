import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
    {
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
            required: true,
            select: 0
        },
        role: {
            type: String,
            enum: ['admin', 'customer'],
            default: 'customer'
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress'
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
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt)
    );
    next();
});

// set "" after saving password
userSchema.post('save', async function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashPassword
) {
    return await bcrypt.compare(
        plainTextPassword, // password from the request "Plain Text Password"
        hashPassword // password from the database "Hashed Password"
    );
};

export const User = model<TUser, UserModel>('User', userSchema);
