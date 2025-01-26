import { TBicycle } from './bicycle.interface';
import Bicycle from './bicycle.model';

// The function inserts a new document into the Bicycle collection.
const createBicycleDB = async (bicycle: TBicycle): Promise<TBicycle> => {
    const result = await Bicycle.create(bicycle);
    return result;
};

// This function returns all documents in the Bicycle collection.
const getAllBicyclesFromDB = async (searchTerm?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i');
        filter.$or = [{ name: regex }, { brand: regex }, { type: regex }];
    }

    const result = await Bicycle.find(filter);
    return result;
};

// Retrieves a single bicycle record from the database using its product ID.
const getSingleBicycleFromDB = async (productId: string) => {
    const result = await Bicycle.findOne({ _id: productId });
    if (!result) {
        throw new Error('Product not found');
    }
    return result;
};

// Updates a bicycle record in the database using its ID and the provided data.
const updateBicycleByIdFromDB = async (id: string, data: TBicycle) => {
    const result = await Bicycle.findByIdAndUpdate(id, data, {
        new: true
    });
    return result;
};

const deleteBicycleByIdFromDB = async (id: string) => {
    const result = await Bicycle.deleteOne({ _id: id });
    return result;
};

export const BicycleServices = {
    createBicycleDB,
    getAllBicyclesFromDB,
    getSingleBicycleFromDB,
    updateBicycleByIdFromDB,
    deleteBicycleByIdFromDB
};
