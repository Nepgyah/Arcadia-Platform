'use client';

import { useBreadcrumbStore } from "@/app/store/store";
import { useEffect } from "react";

export default function SetBreadcrumbs({breadcrumbs}:{breadcrumbs: string[]}) {
    const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs)
    
    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return null
}