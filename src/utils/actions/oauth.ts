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
        // cookieStore.delete('oauth_state')
        return true
    }
    return false
}
