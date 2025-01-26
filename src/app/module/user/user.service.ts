import { User } from './user.model';

const createUserIntoDB = async payload => {
    const result = await User.create(payload);
    return result;
};

export const UserServices = {
    createUserIntoDB
};
