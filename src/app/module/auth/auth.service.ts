import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
    /*
    step 1: check if user exists
    step 2: check if the user already deleted
    step 3: check if the user is blocked
    step 4: check if the password is correct
    step 4: crate token and sent to the client
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
    const jwtPayload = { userEmail: user.email, userRole: user.role };

    // const accessToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_access_secret as string,
    //     {
    //         expiresIn: '30d'
    //     }
    // );
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        Number(config.jwt_access_expires_in)
    );
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        Number(config.jwt_refresh_expires_in)
    );

    return {
        accessToken,
        refreshToken
    };
};
const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    const { userEmail } = decoded;

    const user = await User.isUserExistsByEmail(userEmail);

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'The user is not found');
    }
    if (user?.isDeleted) {
        throw new AppError(StatusCodes.NOT_FOUND, 'The user is deleted');
    }
    if (user?.status === 'blocked') {
        throw new AppError(StatusCodes.NOT_FOUND, 'The user is blocked');
    }

    const jwtPayload = {
        userEmail: user.email,
        userRole: user.role
    };
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        Number(config.jwt_access_expires_in)
    );
    return {
        accessToken
    };
};

const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string }
) => {
    const user = await User.isUserExistsByEmail(userData.userEmail);

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'The user is not found');
    }
    if (user?.isDeleted) {
        throw new AppError(StatusCodes.NOT_FOUND, 'The user is deleted');
    }
    if (user?.status === 'blocked') {
        throw new AppError(StatusCodes.NOT_FOUND, 'The user is blocked');
    }
    // check if the password is correct
    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Password do not matched');
    }
    // hash new password
    const newHashPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt)
    );
    await User.findOneAndUpdate(
        {
            email: userData.userEmail,
            role: userData.userRole
        },
        {
            password: newHashPassword,
            needsPasswordChange: false,
            passwordChangeAt: new Date()
        }
    );
    return null;
};

export const AuthServices = {
    loginUser,
    refreshToken,
    changePassword
};
