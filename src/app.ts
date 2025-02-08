import express, { Application, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandle from './app/Middleware/globalErrorHandler';
import notFound from './app/Middleware/notFound';
const app: Application = express();

// Parsers: Middleware to parse incoming request bodies
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(
    cors({
        origin: 'https://bicycle-store-delta.vercel.app',
        credentials: true
    })
);

// Mount the router at /api so all its routes start with /api
app.use('/api', router);

// applications routs
const getAController = (req: Request, res: Response) => {
    Promise.reject();
    res.send(`The bicycle is moving at a speed of ${config.port} 🚴`);
};

// Root route ("/") which will respond to GET requests
app.get('/', getAController);

// Error-handling middleware (should be defined to handle errors globally)
app.use(globalErrorHandle);

// not found
app.use(notFound);

export default app;
