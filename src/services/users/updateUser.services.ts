import format from "pg-format";
import { TUserResponse, TUserUpdate } from "../../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { userSchema } from "../../schemas";
import { AppError } from "../../error";

const updateUserService = async (
    dataRequest: TUserUpdate,
    userId: number
): Promise<TUserResponse> => {

    const queryString: string = format(
        `
        UPDATE
            users
        SET(%I) = ROW(%L)
            WHERE
        users."id" = $1
        RETURNING *;

    `,
        Object.keys(dataRequest),
        Object.values(dataRequest)
    );

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    };

    const { rows }: QueryResult<TUserResponse> = await client.query(
        queryConfig
    );

    return userSchema.parse(rows[0]);
};

export default updateUserService;
