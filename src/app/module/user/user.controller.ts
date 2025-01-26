import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            result
        }
    });
});

export const UserControllers = {
    createUser
};
