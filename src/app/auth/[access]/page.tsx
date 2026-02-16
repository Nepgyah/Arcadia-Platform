'use client';

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Access() {

    const params = useParams<{ access: string}>()

    useEffect(() => {
        if(params.access) {
            // Call account API to fetch user
            console.log('Calling SSO exchange endpoint')
            fetch(`${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}api/sso/exchange/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                if (res.ok) {
                    console.log("SSO complete!")
                }
            })
        }
    }, [])
    return (
        <div>
            Page
        </div>
    )
}