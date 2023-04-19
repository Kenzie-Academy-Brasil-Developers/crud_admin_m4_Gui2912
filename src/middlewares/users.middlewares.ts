import { NextFunction, Request, Response } from 'express';
import { TCreateUSer } from '../interfaces';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';

const ensureEmailIsUniqueMiddleware = async(req:Request, res:Response, next:NextFunction):Promise<void | Response> => {
    const email:string = req.body.email
    console.log(email);

    const queryString:string = 
    `
        SELECT 
            *
        FROM
            users u
        WHERE
            u."email" = $1
    `

    const queryConfig:QueryConfig = {
        text: queryString,
        values: [email]
    }

    const {rowCount}:QueryResult = await client.query(queryConfig)

    if(rowCount > 0) {
        throw new AppError('E-mail already registered', 409)
    }
    
    return next()
}

export {
    ensureEmailIsUniqueMiddleware
}