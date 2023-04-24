import { QueryConfig, QueryResult } from 'pg'
import { client } from '../../database'
import { AppError } from '../../error'

const softDeleteUserService = async(userId:number):Promise<void> => {
    const queryStringSelect:string = `
        UPDATE
            users
        SET
            users."active" = false
        WHERE
            users."id" = $1;
    `

    const queryConfigSelect:QueryConfig = {
        text: queryStringSelect,
        values: [userId]
    }

    await client.query(queryConfigSelect)

}

export default softDeleteUserService