import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../Middleware/validateRequest';
import { userValidationSchema } from './user.validation';

const router = express.Router();

router.post(
    '/registration',
    validateRequest(userValidationSchema.createUserValidationSchema),
    UserControllers.createUser
);

export const UserRouter = router;
