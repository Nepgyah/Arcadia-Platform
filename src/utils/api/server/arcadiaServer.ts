import { cookies } from "next/headers";
import { ArcadiaGraphqlBase } from "../arcadiaGraphqlBase";

export class ArcadiaServer extends ArcadiaGraphqlBase {

    
    async GraphQL<T>(query: any, variables = {}) : Promise<T> {
        const cookieStore = await cookies()
        const access_token = cookieStore.get('access_token')?.value

        try {
            const response = await fetch(
                this.endpoint,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": `access_token=${access_token}`,       
                    },
                    body: JSON.stringify({
                        query,
                        variables
                    })
                }
            )
            
            if (response.ok) {
                return response.json()
            } else {
                throw 'Error occured fromt he Arcadia API'
            }
        } catch {
            throw 'Error attempting to call the Arcadia Graphql Endpoint'
        }
    }
}

export const arcadiaServerFetch = new ArcadiaServer()