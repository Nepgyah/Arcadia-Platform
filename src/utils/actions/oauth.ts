'use server'

import { cookies } from 'next/headers'

export async function setOauthState(state: string) {
    const cookieStore = await cookies()

    cookieStore.set('oauth_state', state, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 30,
        path: '/',
    })
}

export async function verifyOauthState(urlState: string){

    const cookieStore = await cookies()
    const cookieState = cookieStore.get('oauth_state')
    
    if (cookieState && cookieState.value === urlState) {
        return true
    }
    return false
}

export async function finalizeLogin(auth_code : string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ARCADIA_API_URL}oauth/exchange/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                auth_code: auth_code,
            }
        )
    })

    if (!response.ok) return { success : false}

    const data = await response.json()
    const cookieStore = await cookies()

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

    return { success: true }
}

interface APIResponse {
    ok: boolean,
    message: string
}
export async function LoginAsAdmin(username: string, password: string) : Promise<APIResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ARCADIA_API_URL}user/admin-login/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                username: username,
                password: password
            }
        )
    })

    if (!response.ok) {
        const data = await response.json()
        let result = {
            'ok': false,
            'message': data.detail
        }
        return result
    }

    const data = await response.json()
    const cookieStore = await cookies()

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

    return {
        'ok': true,
        'message': 'Login successful, Redirecting.'
    }
}

export async function deleteOauthState() {
    const cookieStore = await cookies()
    cookieStore.delete('oauth_state')
}