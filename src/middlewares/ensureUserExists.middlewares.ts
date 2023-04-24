import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';

const ensureUserExistsMiddleware = async(req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
    const userId:number = +req.params.id

    const queryString:string = 
    `
        SELECT
            *
        FROM
            users u
        WHERE
            u."id" = $1;
    `

    const queryConfig:QueryConfig = {
        text:queryString,
        values: [userId]
    }

    const {rowCount}:QueryResult = await client.query(queryConfig)

    if(rowCount === 0){
        throw new AppError("User not found", 404)
    }

    return next()
}

export default ensureUserExistsMiddleware