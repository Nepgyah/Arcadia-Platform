import { cookies } from "next/headers";
import { cache } from "react";

export class ArcadiaAPI {

    async GET<T>(endpoint: string) : Promise<T> {
        const api_endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}${endpoint}`;
        const cookieStore = await cookies()
        const access_token = cookieStore.get('access_token')?.value
        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        }

        if (access_token) {
            headers['authorization'] = `Bearer ${access_token}`
        }

        try {
            const response = await fetch(
                api_endpoint,
                {
                    method: 'GET',
                    headers: headers,
                }
            )
            
            const data = await response.json()

            if (response.ok) {
                return data
            } else {
                throw 'Error occured within the Arcadia API'
            }
        } catch {
            throw 'Error occured attempting to call Arcadia REST GET endpoint'
        }
    }

    async POST<T>(endpoint: string, body: any) : Promise<T> {
        const api_endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}${endpoint}`;
        const cookieStore = await cookies()
        const access_token = cookieStore.get('access_token')?.value
        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        }

        if (access_token) {
            headers['authorization'] = `Bearer ${access_token}`
        }

        try {
            const response = await fetch(
                api_endpoint,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                }
            )
            
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                throw 'Error occured within the Arcadia API'
            }
        } catch {
            throw 'Error occured attempting to call Arcadia REST POST endpoint'
        }
    }

    GraphQL = cache(async <T>(query: any, variables = {}): Promise<T> => {
        const api_endpoint = `${process.env.NEXT_PUBLIC_ARCADIA_GRAPH_URL}`;
        const cookieStore = await cookies()
        const access_token = cookieStore.get('access_token')?.value

        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        }

        if (access_token) {
            headers['authorization'] = `Bearer ${access_token}`
        }

        try {
            const response = await fetch(
                api_endpoint,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        query,
                        variables
                    })
                }
            )
            
            const data = await response.json()
            if (response.ok) {
                if (data.errors && data.errors.length > 0) {
                    throw new Error(data.errors[0].message || "An error occured on the API")
                }
                return data
            } else {
                throw new Error(data.errors[0].message);
            }
        } catch (error: any) {
            throw Error(error.message)
        }
    })
}

export const arcadiaAPI = new ArcadiaAPI()