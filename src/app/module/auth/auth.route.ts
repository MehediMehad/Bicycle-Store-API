import express from 'express';
import validateRequest from '../../Middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../Middleware/auth';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
);

router.post(
    '/change-password',
    auth('customer'),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken
);

export const AuthRouter = router;
