import { NextFunction, Request, Response } from 'express';
import config from '../../config';

const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: {
            name: err.name || 'Error',
            details: err.errors || {}
        },
        stack: config.node_env === 'production' ? null : err.stack
    });
};

export default errorMiddleware;
