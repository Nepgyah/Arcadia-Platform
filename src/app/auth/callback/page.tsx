'use client'
export const dynamic = "force-dynamic";

import Link from 'next/link';
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { deleteOauthState, verifyOauthState } from '@/utils/actions/oauth'

export default function CallbackPage() {
    const searchParams = useSearchParams()
    const [hasError, setHasError] = useState(false)
    const auth_code = searchParams.get('auth_code') // 'code' is the standard OAuth key
    const state = searchParams.get('state')    // This is what we check against the cookie

    useEffect(() => {

        async function verify() {
            if (state && auth_code) {
                let stateMatch = await verifyOauthState(state)
                if (stateMatch) {
                    try {
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

                        if (response.ok) {
                            window.location.href = '/';
                        } else {
                            setHasError(true)
                        }
                        await deleteOauthState()
                    } catch (error)  {
                        setHasError(true)
                    } 
                } else {
                    // Error on checking state
                    setHasError(true)
                }
            } else {
                // Error on empty params
                setHasError(true)
            }
        }

        verify()
    }, [searchParams])

    return (
        <div id='page-auth-callback'>
            {
                !hasError ?
                    <p>Verifying</p>
                :
                    <p>An error has occured. Please start the process again <Link href='/auth'>Here</Link></p>
            }
        </div>
    )
}
