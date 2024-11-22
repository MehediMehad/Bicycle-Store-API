import { TBicycle } from './bicycle.interface';
import BicycleModel from './bicycle.model';

// The function inserts a new document into the Bicycle collection.
const createBicycleDB = async (bicycle: TBicycle) => {
    const result = await BicycleModel.create(bicycle);
    return result;
};

// This function returns all documents in the Bicycle collection.
const getAllBicyclesFromDB = async () => {
    const result = await BicycleModel.find();
    return result;
};

// Retrieves a single bicycle record from the database using its product ID.
const getSingleBicycleFromDB = async (productId: string) => {
    const result = await BicycleModel.findOne({ _id: productId });
    return result;
};

// Updates a bicycle record in the database using its ID and the provided data.
const updateBicycleByIdFromDB = async (id: string, data: TBicycle) => {
    const result = await BicycleModel.findByIdAndUpdate(id, data, {
        new: true
    });
    return result;
};

const deleteBicycleByIdFromDB = async (id: string) => {
    const result = await BicycleModel.deleteOne({ _id: id });
    return result;
};

export const BicycleServices = {
    createBicycleDB,
    getAllBicyclesFromDB,
    getSingleBicycleFromDB,
    updateBicycleByIdFromDB,
    deleteBicycleByIdFromDB
};
