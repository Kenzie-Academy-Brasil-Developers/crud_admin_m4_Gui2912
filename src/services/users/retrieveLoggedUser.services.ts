import { QueryConfig, QueryResult } from 'pg'
import { client } from '../../database'
import { userSchema } from '../../schemas'

const retrieveLoggedUserService = async(userEmail:any):Promise<any> => {
    const queryString:string = 
    `
        SELECT 
            *
        FROM 
            users
        WHERE
            users."email" = $1;
    `

    const queryConfig:QueryConfig = {
        text: queryString,
        values: [userEmail]
    }

    const {rows}:QueryResult = await client.query(queryConfig)

    return userSchema.parse(rows[0])

}

export default retrieveLoggedUserService