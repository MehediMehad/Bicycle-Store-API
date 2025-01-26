import { z } from 'zod';
import { UserRole, UserStatus } from './user.constant';

// Validation schema for creating a user
const createUserValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(3, { message: 'Name must be at least 3 characters long' })
            .max(50, { message: 'Name cannot exceed 50 characters' })
            .nonempty({ message: 'Name is required' }),
        email: z.string().email({
            message:
                'Invalid email format. Please provide a valid email address.'
        }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(128, { message: 'Password cannot exceed 128 characters' }),
        role: z.enum([...UserRole] as [string, ...string[]], {
            errorMap: () => ({
                message: `Invalid role. Allowed roles are: ${UserRole.join(', ')}.`
            })
        }),
        status: z
            .enum([...UserStatus] as [string, ...string[]], {
                errorMap: () => ({
                    message: `Invalid status. Allowed statuses are: ${UserStatus.join(', ')}.`
                })
            })
            .default('in-progress'),
        isDeleted: z.boolean().default(false)
    })
});

export const userValidationSchema = {
    createUserValidationSchema
};
