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
    isUserExists(id: string): Promise<TUser | null>;
}
