import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/registration', UserControllers.createUser);

export const UserRouter = router;
