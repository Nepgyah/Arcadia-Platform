'use client';

import '@/styles/pages/_global-error.scss';
import { useEffect } from "react";

export default function GlobalError() {

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.href = '/'
        }, 15000)

        return () => clearInterval(interval)

    }, [])
    return (
        <html id="global-error">
            <body>
                <h2>Something Went Wrong.</h2>
                <p>The Arcadia server utilizes cold starts. This can cause the platform to pause due to failed api calls.</p>
                <p>The page will automatically reload to attempt to combat cold starts, our sincere appologies. - The D2X Team</p>
            </body>
        </html>
    )
}