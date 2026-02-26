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
                toaster.create({
                    description: `${data.detail}`,
                    type: 'error'
                })
                throw 'Error on the server'
            } else {
                return res.json();
            }
        
        // Catch errors trying to call the api
        } catch (error) {
            console.log('Here', error)
            toaster.create({
                description: 'Unable to make api call',
                type: 'error'
            })
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
                toaster.create({
                    description: `${data.detail}`,
                    type: 'error'
                })
                throw 'Error occurred from the api'
            } else {
                return res.json();
            }
        } catch(error) {
            console.log(error)
            toaster.create({
                description: 'Unable to make api call',
                type: 'error'
            })
            throw 'Error attempting to call api'
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
                toaster.create({
                    description: `${data.detail}`,
                    type: 'error'
                })
                throw 'Error occurred from the api'
            } else {
                return res.json();
            }
        } catch(error) {
            toaster.create({
                description: 'Unable to make api call',
                type: 'error'
            })
            throw 'Error attempting to call api'
        }
    }
}

export const arcadiaAPI = new ArcadiaAPI();
