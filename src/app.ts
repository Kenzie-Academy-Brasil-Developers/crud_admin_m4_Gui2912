import "express-async-errors";
import { handleError } from "./error";
import express, { Application, json } from "express";
import userRoutes from './routes/users.routes';
import loginRoutes from './routes/login.routes';

const app: Application = express();
app.use(json());

app.use('/users', userRoutes);
app.use('/login', loginRoutes);

app.use(handleError);

export default app;
