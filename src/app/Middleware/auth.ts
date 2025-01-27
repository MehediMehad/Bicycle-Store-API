import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../module/user/user.interface';

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
            // check if the token is valid
            jwt.verify(
                token,
                config.jwt_access_secret as string,
                function (err, decoded) {
                    if (err) {
                        throw new AppError(
                            StatusCodes.UNAUTHORIZED,
                            'You are not authorize!'
                        );
                    }
                    const role = (decoded as JwtPayload).userRole;
                    if (requiredRoles && !requiredRoles.includes(role)) {
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
        }
    );
};

export default auth;

// 17-5 Create auth middleware
