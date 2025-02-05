import QueryBuilder from '../../builder/QueryBuilder';
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
export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB
};
