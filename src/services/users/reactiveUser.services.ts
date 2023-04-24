import { QueryConfig, QueryResult } from 'pg'
import { TUserResponse } from '../../interfaces'
import { client } from '../../database'

const reactiveUserService = async(userId:number):Promise<TUserResponse> => {
    const queryString: string = `
    
        UPDATE 
            users
        SET
            users."active" = true
        WHERE
            users."id" = $1;
    `

    const queryConfig:QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const {rows}:QueryResult = await client.query(queryConfig)

    return rows[0]
}

export default reactiveUserService