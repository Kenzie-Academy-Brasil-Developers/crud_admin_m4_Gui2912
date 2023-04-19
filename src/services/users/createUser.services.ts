import format from "pg-format";
import { TCreateUSer, TUserResponse } from "../../interfaces";
import { QueryResult } from 'pg';
import { client } from '../../database';
import { userSchema } from '../../schemas';

const createUserService = async (
    data: TCreateUSer
): Promise<void | TUserResponse> => {
    const queryString: string = format(
    `
        INSERT INTO
            users (%I)
        VALUES(%L)
        RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
    );

    const {rows}:QueryResult<TUserResponse> = await client.query(queryString)

    return userSchema.parse( rows[0])
};

export default createUserService;
