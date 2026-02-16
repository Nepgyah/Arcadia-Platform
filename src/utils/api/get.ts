import { toaster } from "@/components/ui/toaster"

export const apiGET = async <T>(url: string): Promise<T> => {
    const endpoint = `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}${url}`

    try {
        console.log('Calling endpoint', endpoint)
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
            throw ''
        } else {
            return res.json();
        }
    
    // Catch errors trying to call the api
    } catch (error) {
        console.log(error)
        toaster.create({
            description: 'Unable to make api call',
            type: 'error'
        })
        throw ''
    }
}
