import express, { Application, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// applications routs
const getAController = (req: Request, res: Response) => {
    res.send(`The bicycle is moving at a speed of ${config.port} 🚴`);
};

app.get('/', getAController);

export default app;
