'use server'

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function handleGetUser() {
    const cookieStore = await cookies()
    const refresh_token = cookieStore.get('refresh_token')
    if (refresh_token) {
        const cookieString = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');

        let user = await FetchUser(cookieString);
        if (!user) {
            let new_cookies = await RefreshToken(cookieString, cookieStore)
            if (new_cookies) user = await FetchUser(new_cookies)
        }
        return user

    } else {
        return null
    }
}


async function FetchUser(cookieString : string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}user/`,
        {
            method: 'GET',
            headers: {
                Accept: "application/json",
                'Cookie' : cookieString
            }
        }
    )

    if(response.ok) {
        const data = await response.json()
        return data.user
    } else {
        return null
    }
}

async function RefreshToken(cookieString : string, cookieStore: ReadonlyRequestCookies) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}oauth/refresh/`,
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie' : cookieString
            },
        }
    )

    if (response.ok) {
        const data = await response.json()
        cookieStore.set({
            name: data.access_token.key,
            value: data.access_token.value, 
            httpOnly: data.access_token.httponly,
            secure: data.access_token.secure,
            sameSite: data.access_token.samesite,
            expires: new Date(data.access_token.expires),
            path: data.access_token.path
        })
        cookieStore.set({
            name: data.refresh_token.key,
            value: data.refresh_token.value, 
            httpOnly: data.refresh_token.httponly,
            secure: data.refresh_token.secure,
            sameSite: data.refresh_token.samesite,
            expires: new Date(data.refresh_token.expires),
            path: data.refresh_token.path
        })

        return `${data.access_token.key}=${data.access_token.value}; ${data.refresh_token.key}=${data.refresh_token.value}`;
    }
    return null
}

export async function logoutUser() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
}