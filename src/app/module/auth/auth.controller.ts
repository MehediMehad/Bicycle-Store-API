import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User logged in successfully!',
        data: {
            accessToken
        }
    });
});

export const AuthControllers = {
    loginUser
};
