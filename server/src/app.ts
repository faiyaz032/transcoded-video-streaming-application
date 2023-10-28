//dependencies
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import globalErrorMiddleware from './middlewares/globalErrorMiddleware';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import apiRouter from './routes/index.routes';

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

//api routes
app.use('/api', apiRouter);

app.all('*', notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
