import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
};
const getAllUserFromDB = async (query: Record<string, unknown>) => {
    const studentQuery = new QueryBuilder(User.find(), query)
        .search(['name', 'email'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await studentQuery.countTotal();
    const result = await studentQuery.modelQuery;

    return {
        meta,
        result
    };
};
const updateUserStatusIntoDB = async (_id: string, payload: Partial<TUser>) => {
    const user = await User.findById(_id);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
    }

    const result = await User.findByIdAndUpdate(
        _id,
        { status: payload.status },
        {
            new: true,
            runValidators: true
        }
    );

    return result;
};

export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    updateUserStatusIntoDB
};
