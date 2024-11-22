import { TBicycle } from './bicycle.interface';
import BicycleModel from './bicycle.model';

const createBicycleDB = async (bicycle: TBicycle) => {
    const result = await BicycleModel.create(bicycle);
    return result;
};

const getAllBicyclesFromDB = async () => {
    const result = await BicycleModel.find();
    return result;
};

const getSingleBicycleFromDB = async (productId: string) => {
    const result = await BicycleModel.findOne({ _id: productId });
    return result;
};

export const BicycleServices = {
    createBicycleDB,
    getAllBicyclesFromDB,
    getSingleBicycleFromDB
};
