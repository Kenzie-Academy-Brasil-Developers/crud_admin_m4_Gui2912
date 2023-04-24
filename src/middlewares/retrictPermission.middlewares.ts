import { NextFunction, Request, Response } from "express";
import {  QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../interfaces";
import { client } from "../database";
import { AppError } from '../error';

const retrictPermissionMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userEmail = res.locals.email;

    const queryStringSelect: string = `
    SELECT
        *
    FROM
        users
    WHERE
        users."email" = $1;
`;

    const queryConfigSelect: QueryConfig = {
        text: queryStringSelect,
        values: [userEmail],
    };

    const querySelectResult: QueryResult = await client.query(
        queryConfigSelect
    );

    const userId = req.params.id || querySelectResult.rows[0].id


    if (
        !querySelectResult.rows[0].admin &&
        querySelectResult.rows[0].id !== userId
    ) {
        throw new AppError("Insufficient Permission", 403);
    }

    return next();
};

export default retrictPermissionMiddleware
