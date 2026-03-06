'use server'

import { cookies } from "next/headers";

export async function handleGetUser() {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')

    if (access_token) {
        const cookieString = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}user/`,
                {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        'Cookie' : cookieString
                    }
                }
            )
            if(res.ok) {
                const data = await res.json()
                return data.user
            } else {
                return null
            }
        } catch {
            return null
        }
    } else {
        return null
    }
}

export async function logoutUser() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
}