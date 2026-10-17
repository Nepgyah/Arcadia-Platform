import { cookies } from "next/headers";

type fetchType = 'GET' | 'POST' | 'DELETE' | 'PUT';

class baseAPI {
    rootURL: string;

    constructor(rootURL: string) {
        this.rootURL = rootURL
    }
    async setupHeader() {
        const cookieStore = await cookies();
        const access_token = cookieStore.get('access_token')?.value

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        }

        if (access_token) {
            headers['authorization'] = `Bearer ${access_token}`
        }
        return headers
    }

    async FETCH<T>(endpoint: string, fetchType: fetchType, body: unknown) : Promise<T> {
        const url = `${this.rootURL}${endpoint}`;
        const headers = await this.setupHeader()

        const response = await fetch(
            url,
            {
                method: fetchType,
                headers: headers,
                body: fetchType == 'POST' || 'PUT' ? JSON.stringify(body) : null
            }
        )

        const data = await response.json()

        if(!response.ok) {
            const apiErrorMessage = data.errors[0].message
            throw new Error(apiErrorMessage)
        }

        return data
    }

    async GRAPHQL<T>(query: string, variables: Record<string, unknown> = {}) : Promise<T> {
        const url = `${this.rootURL}/graphql/`;
        const headers = await this.setupHeader();

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                variables
            })
        });

        const data = await response.json();

        if (data.errors && data.errors.length > 0) {
            throw new Error(data.errors[0].message);
        }

        return data.data as T;
    }
}

export const arcadiaAPI = new baseAPI(`${process.env.ARCADIA_URL}`) 