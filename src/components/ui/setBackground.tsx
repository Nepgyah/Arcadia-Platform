'use client';

import { useEffect } from "react"
import { useBackgroundStore } from "@/app/store/backgroundStore"
import { usePathname } from "next/navigation";

export function SetBackground({bgUrl}:{bgUrl: string}) {
    const setBGUrl = useBackgroundStore((state) => state.setBgUrl)
    const pathname = usePathname()

    useEffect(() => {
        if (pathname.startsWith('/voice-actor')) {
            setBGUrl('/wallpaper/default-wallpaper.jpg')
        } else if (bgUrl) {
            setBGUrl(bgUrl)
        } else {
            setBGUrl('/wallpaper/default-wallpaper.jpg')
        }
    }, [])

    return null
}