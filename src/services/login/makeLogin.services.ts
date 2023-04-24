import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import { TLoginInterface, TUserResponse } from "../../interfaces";
import { compareSync } from "bcryptjs";
import { createLoginSchema } from "../../schemas";
import { sign } from "jsonwebtoken";
import "dotenv/config";

const makeLoginService = async (payload: TLoginInterface): Promise<string> => {
    const queryString: string = `
        SELECT 
            *
        FROM
            users 
        WHERE
            users."email" = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [payload.email],
    };

    const { rowCount, rows }: QueryResult = await client.query(queryConfig);

    if (rowCount === 0 || rows[0] === undefined) {
        throw new AppError("Wrong email/password", 401);
    }

    if (!rows[0].active) {
        throw new AppError("Wrong email/password", 401);
    }

    const passwordIsValid: boolean = compareSync(
        payload.password,
        rows[0].password
    );

    if (!passwordIsValid) {
        throw new AppError("Wrong email/password", 401);
    }

    const token: string = sign(
        {
            email: payload.email,
        },
        String(process.env.SECRET_KEY),
        {
            expiresIn: process.env.EXPIRES_IN,
            subject: String(rows[0].id),
        }
    );

    return token;
};

export default makeLoginService;
