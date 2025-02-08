/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TBicycle } from './bicycle.interface';
import Bicycle from './bicycle.model';

// The function inserts a new document into the Bicycle collection.
const createBicycleDB = async (
    file: any,
    bicycle: TBicycle
): Promise<TBicycle> => {
    const imageName = `${bicycle?.brand}`;
    const { secure_url } = (await sendImageToCloudinary(
        imageName,
        file?.path
    )) as { secure_url: string };
    const result = await Bicycle.create(bicycle);
    result.image = secure_url;
    await result.save();
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
const updateBicycleByIdFromDB = async (
    bicycleId: string,
    file: any,
    updatedData: Partial<TBicycle>
): Promise<TBicycle | null> => {
    const bicycle = await Bicycle.findById(bicycleId);
    if (!bicycle) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Bicycle not found');
    }

    if (file) {
        const imageName = `${updatedData?.brand || bicycle.brand}`;
        const { secure_url } = (await sendImageToCloudinary(
            imageName,
            file?.path
        )) as { secure_url: string };
        updatedData.image = secure_url;
    }

    Object.assign(bicycle, updatedData);
    await bicycle.save();

    return bicycle;
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
