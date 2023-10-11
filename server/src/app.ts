import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import globalErrorMiddleware from './middlewares/globalErrorMiddleware';
import notFoundMiddleware from './middlewares/notFoundMiddleware';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello from the server',
  });
});

app.all('*', notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
