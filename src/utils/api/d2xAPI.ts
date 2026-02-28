import { toaster } from "@/components/ui/toaster"

class D2XAPI {
    constructor() {}

    async GET<T>(url: string): Promise<T> {
        const endpoint = `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}${url}`;

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
                throw ''
            } else {
                return res.json();
            }
        
        // Catch errors trying to call the api
        } catch (error) {
            throw ''
        }
    }

    async POST<T>(url: string, body: any) : Promise<T> {
        const endpoint = `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}${url}`;

        try {
            const res = await fetch(
                endpoint,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
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
            throw 'Error attempting to call api'
        }
    }
}

export const d2xAPI = new D2XAPI();
