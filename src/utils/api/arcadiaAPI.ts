import { toaster } from "@/components/ui/toaster";

class ArcadiaAPI {
    constructor() {}

    async GET<T>(url: string): Promise<T> {
        const endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}${url}`;

        try {
            const res = await fetch(
                endpoint,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Accept: "application/json",
                    },
                }
            )
            // Error from the server
            if (!res.ok) {
                const data = await res.json()
                throw 'Error on the server'
            } else {
                return res.json();
            }
        
        // Catch errors trying to call the api
        } catch (error) {
            throw 'Error handling api'
        }
    }

    async POST<T>(url: string, body: any) : Promise<T> {
        const endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}${url}`;

        try {
            const res = await fetch(
                endpoint,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'Accept': "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }
            )

            // Error from the server
            if (!res.ok) {
                const data = await res.json()
                throw 'Error occurred from the Arcadia API REST endpoint'
            } else {
                return res.json();
            }
        } catch(error) {
            throw 'Error occurred attempting to call the Arcadia API REST endpoint'
        }
    }

    async GraphQL<T>(query: any, variables = {}) : Promise<T> {
        const endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_GRAPH_URL}`;

        try {
            const res = await fetch(
                endpoint,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query, variables }),
                }
            )
        // Error from the server
            if (!res.ok) {
                const data = await res.json()
                throw 'Error occurred from the Arcadia API Graphql endpoint'
            } else {
                return res.json();
            }
        } catch(error) {
            console.log(error)
            throw 'Error occurred attempting to call the Arcadia API Graphql endpoint'
        }
    }
}

export const arcadiaAPI = new ArcadiaAPI();
