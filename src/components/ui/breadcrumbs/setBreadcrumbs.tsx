'use client';
import { useEffect } from "react";
import { useBreadcrumbStore } from "@/app/store/breadcrumbStore";

export default function SetBreadcrumbs({breadcrumbs}:{breadcrumbs: string[]}) {
    const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs)
    
    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return null
}