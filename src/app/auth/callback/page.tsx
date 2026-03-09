'use client'
export const dynamic = "force-dynamic";

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { deleteOauthState, finalizeLogin, verifyOauthState } from '@/utils/actions/oauth'

function CallbackContent() {
    const searchParams = useSearchParams()
    const [hasError, setHasError] = useState(false)
    const auth_code = searchParams.get('auth_code') // 'code' is the standard OAuth key
    const state = searchParams.get('state')    // This is what we check against the cookie

    useEffect(() => {

        async function verify() {
            if (state && auth_code) {
                let stateMatch = await verifyOauthState(state)
                if (stateMatch) {
                    const result = await finalizeLogin(auth_code)

                    if (result.success) {
                        window.location.href = '/';
                    } else {
                        setHasError(true)
                    }
                    await deleteOauthState()
                } else {
                    // Error on checking state
                    console.log('Mismatch states')
                    setHasError(true)
                }
            } else {
                // Error on empty params
                console.log('No state and code')
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

export default function Page() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <CallbackContent />
        </Suspense>
    )
}