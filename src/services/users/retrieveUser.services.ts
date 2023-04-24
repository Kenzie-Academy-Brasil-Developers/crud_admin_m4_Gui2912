import { QueryResult } from "pg";
import { TAllUsers } from "../../interfaces";
import { client } from "../../database";
import { allUsersListedSchema } from "../../schemas";

const retrieveUsersService = async (): Promise<TAllUsers> => {
    const queryString: string = `
        SELECT
            *
        FROM    
            users;
    `;

    const { rows }: QueryResult = await client.query(queryString);

    return allUsersListedSchema.parse(rows);
};

export default retrieveUsersService;
