import { TBicycle } from './bicycle.interface';
import BicycleModel from './bicycle.model';

const createBicycleDB = async (bicycle: TBicycle) => {
    const result = await BicycleModel.create(bicycle);
    return result;
};

export const BicycleServices = {
    createBicycleDB
};
