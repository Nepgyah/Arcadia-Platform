'use server';

import { cookies } from "next/headers";

class Oauth {
    constructor () {}

    async setOauthState(state: string) {
        const cookieStore = await cookies()
    
        console.log('Setting cookies')
        cookieStore.set(
            'oauth_state', state, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 10
            }
        )
    }

    async verifyOauthState(inputState: string) {
        const cookieStore = await cookies()
        console.log('Verifying cookies')
        const cookieState = cookieStore.get('oauth_state')
        if(cookieState) {
            console.log(cookieState)
            console.log(inputState)
            if(String(cookieState) == inputState) {
                return true
            } 
        }
        return false
    }
}

export const oauth = new Oauth()