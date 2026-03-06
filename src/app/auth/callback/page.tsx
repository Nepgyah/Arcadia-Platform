'use client'

import { verifyOauthState } from '@/utils/actions/oauth'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CallbackPage() {
    const searchParams = useSearchParams()

    useEffect(() => {
        const auth_code = searchParams.get('auth_code') // 'code' is the standard OAuth key
        const state = searchParams.get('state')    // This is what we check against the cookie

        async function verify() {
            if (state && auth_code) {
                console.log(auth_code, state)
                let stateMatch = await verifyOauthState(state)
                if (stateMatch) {
                    console.log('calling api')
                    ExchangeAuthCode(auth_code)
                }
            }
        }

        verify()
    }, [searchParams])

    return (
        <div>
            <p>Verifying credentials</p>
        </div>
    )
}

async function ExchangeAuthCode(authCode: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ARCADIA_API_URL}oauth/exchange/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    auth_code: authCode,
                }
            )
        })

        if (response.ok) {
            const data = await response.json()
        } else {
            console.log('Error')
        }
    } catch {

    }
}