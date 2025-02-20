import { z } from 'zod';
const loginValidationSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email({
                message:
                    'Invalid email format. Please provide a valid email address.'
            })
            .nonempty({ message: 'Email is required' }),
        password: z.string({ required_error: 'password is required' })
    })
});
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required!'
        })
    })
});
const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Old password is required'
        }),
        newPassword: z.string({ required_error: 'Password is required' })
    })
});
export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    changePasswordValidationSchema
};
