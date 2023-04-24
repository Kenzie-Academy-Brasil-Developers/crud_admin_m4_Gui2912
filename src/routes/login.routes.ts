import { Router } from "express";
import {
    makeLoginController
} from "../controllers";
import { ensureBodyIsValidMiddleware } from '../middlewares';
import { createLoginSchema } from '../schemas';

const loginRoutes: Router = Router();

loginRoutes.post("",ensureBodyIsValidMiddleware(createLoginSchema), makeLoginController);

export default loginRoutes;
