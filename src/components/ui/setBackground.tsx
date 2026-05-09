'use client';

import { useEffect } from "react"
import { useBackgroundStore } from "@/app/store/backgroundStore"
import { usePathname } from "next/navigation";

export function SetBackground({bgUrl}:{bgUrl: string}) {
    const setBGUrl = useBackgroundStore((state) => state.setBgUrl)
    const setHasCustomBG = useBackgroundStore((state) => state.setHasCustomBg)

    useEffect(() => {
        setHasCustomBG(true)
        setBGUrl(bgUrl)

        return () => {
            setHasCustomBG(false)
        }
    }, [bgUrl, setBGUrl, setHasCustomBG])

    return null
}