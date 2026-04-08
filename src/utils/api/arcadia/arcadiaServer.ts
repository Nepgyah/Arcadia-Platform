import { cookies } from "next/headers";

export class ArcadiaServer {
 
    async GraphQL<T>(query: any, variables = {}) : Promise<T> {
        const endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_GRAPH_URL}`;
        const cookieStore = await cookies()
        const access_token = cookieStore.get('access_token')?.value

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        }

        if (access_token) {
            headers['Cookie'] = `access_token=${access_token}`
        }
        try {
            const response = await fetch(
                endpoint,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        query,
                        variables
                    })
                }
            )
            
            if (response.ok) {
                const data = await response.json()
                return data
            } else {
                throw 'Error occured fromt he Arcadia API'
            }
        } catch {
            throw 'Error attempting to call the Arcadia Graphql Endpoint'
        }
    }
}

export const arcadiaServerFetch = new ArcadiaServer()