import { toaster } from "@/components/ui/toaster"
import { ArcadiaGraphqlBase } from "../arcadiaGraphqlBase"

export class ArcadiaClientFetch extends ArcadiaGraphqlBase {

    async GraphQL<T>(query: any, variables = {}) : Promise<GraphqlResponse<T>> {

        try {
            const response = await fetch(
                this.endpoint,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",     
                    },
                    body: JSON.stringify({
                        query,
                        variables
                    })
                }
            )
            
            const data = await response.json()
            if (response.ok) {
                const message = data?.message
                if (message) {
                    toaster.create({
                        title: data.message,
                        type: 'success'
                    })
                }
                return data
            } else {
                const errorMessage = data.errors?.[0]?.message || 'Error occured from the API'
                toaster.create({
                    title: errorMessage,
                    type: 'error'
                })
                throw new Error(errorMessage)
            }
        } catch (error: any) {
            throw error || 'Client error: Unable to call the Arcadia Graphql Endpoint'
        }
    }
}

export const arcadiaClientFetch = new ArcadiaClientFetch()