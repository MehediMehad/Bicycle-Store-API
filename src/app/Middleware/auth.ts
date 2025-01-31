import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../module/user/user.interface';
import { User } from '../module/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            // if the token is send from the client
            if (!token) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You are not authorize'
                );
            }

            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as JwtPayload;
            const { userRole, userEmail } = decoded;

            // check if the token is valid

            /*
                step 1: check if user exists
                step 2: check if the user already deleted
                step 3: check if the user is blocked
                step 4: check if the password is correct
            */
            const user = await User.isUserExistsByEmail(userEmail);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
            }
            const isUserDeleted = user.isDeleted;
            if (isUserDeleted) {
                throw new AppError(
                    StatusCodes.FORBIDDEN,
                    'This is user deleted!'
                );
            }
            const isUserBlocked = user.status === 'blocked';
            if (isUserBlocked) {
                throw new AppError(
                    StatusCodes.FORBIDDEN,
                    'This is user blocked!'
                );
            }

            if (requiredRoles && !requiredRoles.includes(userRole)) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You are not authorize!'
                );
            }
            // decoded undefined
            req.user = decoded as JwtPayload;
            next();
        }
    );
};

export default auth;

// 17-5 Create auth middleware
