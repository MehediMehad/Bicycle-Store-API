import QueryBuilder from '../../builder/QueryBuilder';
import { TBicycle } from './bicycle.interface';
import Bicycle from './bicycle.model';

// The function inserts a new document into the Bicycle collection.
const createBicycleDB = async (bicycle: TBicycle): Promise<TBicycle> => {
    const result = await Bicycle.create(bicycle);
    return result;
};

// This function returns all documents in the Bicycle collection.
const getAllBicyclesFromDB = async (query: Record<string, unknown>) => {
    const bicycleQuery = new QueryBuilder(Bicycle.find(), query)
        .search(['name', 'brand'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await bicycleQuery.modelQuery;
    const meta = await bicycleQuery.countTotal();

    return {
        meta,
        result
    };
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
