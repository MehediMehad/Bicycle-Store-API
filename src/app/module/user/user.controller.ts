import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'OfferedCourse fetched successfully',
        data: result
    });
});

export const UserControllers = {
    createUser
};
