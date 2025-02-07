import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { UserServices } from './user.service';
import { RequestHandler } from 'express';

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Create user successfully',
        data: result
    });
});
const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUserFromDB(req.query);
    // console.log(JSON.stringify(result, null, 1));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Users are retrieved successfully!',
        meta: result.meta,
        data: result.result
    });
});
const updateUserStatus: RequestHandler = catchAsync(async (req, res) => {
    const { _id, status } = req.body;

    const result = await UserServices.updateUserStatusIntoDB(_id, { status });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User is updated successfully!',
        data: result
    });
});

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUserStatus
};
