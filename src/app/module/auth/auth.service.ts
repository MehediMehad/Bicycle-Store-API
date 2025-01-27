import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
    console.log(payload);

    /*
    step 1: check if user exists
    step 2: check if the user already deleted
    step 3: check if the user is blocked
    step 4: check if the password is correct
    step 4: check if the password is correct
    */
    const user = await User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
    }
    const isUserDeleted = user.isDeleted;
    if (isUserDeleted) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This is user deleted!');
    }
    const isUserBlocked = user.status === 'blocked';
    if (isUserBlocked) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This is user blocked!');
    }

    if (!(await User.isPasswordMatched(payload.password, user.password))) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Password is incorrect!');
    }

    return {};
};

export const AuthServices = {
    loginUser
};
