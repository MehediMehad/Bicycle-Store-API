import { z } from 'zod';
import {
    BicycleAvailability,
    BicycleBrand,
    BicycleColor,
    BicycleType
} from './bicycle.constant';

// Validation schema for creating a user
const createBicycleValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(3, { message: 'Name must be at least 3 characters long' })
            .max(25, { message: 'Name cannot exceed 25 characters' })
            .nonempty({ message: 'Name is required' }),
        description: z
            .string()
            .min(3, {
                message: 'Description must be at least 3 characters long'
            })
            .max(100, { message: 'Description cannot exceed 100 characters' })
            .nonempty({ message: 'Description is required' }),
        price: z.number({ required_error: 'Price most be Number' }),
        quantity: z.number({ required_error: 'Quantity most be Number' }),
        inStock: z.boolean({ required_error: 'inStock most be Boolean' }),
        image: z.string().optional(),
        type: z.enum([...BicycleType] as [string, ...string[]], {
            errorMap: () => ({
                message: `Invalid type. Allowed types are: ${BicycleType.join(', ')}.`
            })
        }),
        brand: z.enum([...BicycleBrand] as [string, ...string[]], {
            errorMap: () => ({
                message: `Invalid brand. Allowed types are: ${BicycleBrand.join(', ')}.`
            })
        }),
        color: z.enum([...BicycleColor] as [string, ...string[]], {
            errorMap: () => ({
                message: `Invalid Color. Allowed types are: ${BicycleColor.join(', ')}.`
            })
        }),
        availability: z.enum(
            [...BicycleAvailability] as [string, ...string[]],
            {
                errorMap: () => ({
                    message: `Invalid Color. Allowed Availability are: ${BicycleAvailability.join(', ')}.`
                })
            }
        )
    })
});
const updateBicycleValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(3, { message: 'Name must be at least 3 characters long' })
            .max(25, { message: 'Name cannot exceed 25 characters' })
            .nonempty({ message: 'Name is required' })
            .optional(),
        description: z
            .string()
            .min(3, {
                message: 'Description must be at least 3 characters long'
            })
            .max(100, { message: 'Description cannot exceed 100 characters' })
            .nonempty({ message: 'Description is required' }),
        price: z.number({ required_error: 'Price most be Number' }).optional(),
        quantity: z
            .number({ required_error: 'Quantity most be Number' })
            .optional(),
        inStock: z
            .boolean({ required_error: 'inStock most be Boolean' })
            .optional(),
        image: z.string().optional(),
        type: z
            .enum([...BicycleType] as [string, ...string[]], {
                errorMap: () => ({
                    message: `Invalid type. Allowed types are: ${BicycleType.join(', ')}.`
                })
            })
            .optional(),
        brand: z
            .enum([...BicycleBrand] as [string, ...string[]], {
                errorMap: () => ({
                    message: `Invalid brand. Allowed types are: ${BicycleBrand.join(', ')}.`
                })
            })
            .optional(),
        color: z
            .enum([...BicycleColor] as [string, ...string[]], {
                errorMap: () => ({
                    message: `Invalid Color. Allowed types are: ${BicycleColor.join(', ')}.`
                })
            })
            .optional(),
        availability: z
            .enum([...BicycleAvailability] as [string, ...string[]], {
                errorMap: () => ({
                    message: `Invalid Color. Allowed Availability are: ${BicycleAvailability.join(', ')}.`
                })
            })
            .optional()
    })
});

// export const updateFacultyValidationSchema = z.object({
//     body: z.object({
//         faculty: z.object({
//             designation: z.string().optional(),
//             name: updateUserNameValidationSchema,
//             gender: z.enum([...Gender] as [string, ...string[]]).optional(),
//             dateOfBirth: z.string().optional(),
//             email: z.string().email().optional(),
//             contactNo: z.string().optional(),
//             emergencyContactNo: z.string().optional(),
//             bloodGroup: z
//                 .enum([...BloodGroup] as [string, ...string[]])
//                 .optional(),
//             presentAddress: z.string().optional(),
//             permanentAddress: z.string().optional(),
//             profileImg: z.string().optional(),
//             academicDepartment: z.string().optional()
//         })
//     })
// });

export const bicycleValidationSchema = {
    createBicycleValidationSchema,
    updateBicycleValidationSchema
};
