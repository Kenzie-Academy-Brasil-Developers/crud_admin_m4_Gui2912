import { Request, Response } from "express";
import { makeLoginService } from '../services';
import { TLoginInterface } from '../interfaces';

const makeLoginController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const loginData:TLoginInterface = req.body

    const token = await makeLoginService(loginData)

    return res.status(200).json({token});
};

export default makeLoginController;
