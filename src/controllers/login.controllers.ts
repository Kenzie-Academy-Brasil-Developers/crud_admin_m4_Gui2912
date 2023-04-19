import { Request, Response } from "express";
import { makeLoginService } from '../services';

const makeLoginController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    return res.status(201).json();
};

export default makeLoginController;
