'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const searchParams = useSearchParams()
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const auth_code = searchParams.get('auth_code')
    }, [])
    return (
        <h1>Verifying your credentials</h1>
    )
}