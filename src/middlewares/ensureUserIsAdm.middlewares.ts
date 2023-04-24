import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const ensureUserIsAdmMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userEmail: string = res.locals.email;

    const queryString: string = `
        SELECT
            *
        FROM 
            users u
        WHERE
            u."email" = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userEmail],
    };

    const { rows }: QueryResult = await client.query(queryConfig);

    if (!rows[0].admin) {
        throw new AppError("Insufficient Permission", 403);
    }

    return next();
};

export default ensureUserIsAdmMiddleware;
