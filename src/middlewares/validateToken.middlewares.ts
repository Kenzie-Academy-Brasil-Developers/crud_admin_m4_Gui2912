import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";
import "dotenv/config";
const validateTokenMiddlware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const auth: string | undefined = req.headers.authorization;

    if (!auth) {
        throw new AppError("Missing Bearer Token", 401);
    }

    const [bearer, token] = auth.split(" ");

    verify(
        token,
        String(process.env.SECRET_KEY),
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(error.message, 401);
            }

            res.locals.email = decoded.email;
        }
    );

    return next();
};

export default validateTokenMiddlware;
