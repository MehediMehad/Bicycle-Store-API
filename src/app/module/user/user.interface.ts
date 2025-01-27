/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserRole = 'admin' | 'customer';
export type TUserStatus = 'in-progress' | 'blocked';

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    status?: TUserStatus;
    isDeleted?: boolean;
}
export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashPassword: string
    ): Promise<boolean>;
}
