export type TUserRole = 'admin' | 'customer';
export type TUserStatus = 'in-progress' | 'blocked';

export interface TUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    status: TUserStatus;
    isDeleted: boolean;
}
