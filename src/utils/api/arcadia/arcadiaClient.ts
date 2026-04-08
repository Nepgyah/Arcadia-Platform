import { toaster } from "@/components/ui/toaster";

export class ArcadiaClientFetch {

    async GET<T>(endpoint: string ) : Promise<RESTResponse<T>> {
        const formatted_url = `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}${endpoint}`;

        try {
            const response = await fetch(
                formatted_url,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",     
                    },
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
            throw error || 'Client error: Unable to call the Arcadia REST Endpoint'
        }
    }

    async GraphQL<T>(query: any, variables = {}) : Promise<GraphqlResponse<T>> {
        const endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_GRAPH_URL}`;
        
        try {
            const response = await fetch(
                endpoint,
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