import express, { Application, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors';
import errorMiddleware from './app/Middleware/Middleware';
import router from './app/routes';
const app: Application = express();

// Parsers: Middleware to parse incoming request bodies
app.use(express.json());
app.use(cors());

// Mount the router at /api so all its routes start with /api
app.use('/api', router);

// applications routs
const getAController = (req: Request, res: Response) => {
    res.send(`The bicycle is moving at a speed of ${config.port} 🚴`);
};

// Root route ("/") which will respond to GET requests
app.get('/', getAController);

// Error-handling middleware (should be defined to handle errors globally)
app.use(errorMiddleware);

export default app;
