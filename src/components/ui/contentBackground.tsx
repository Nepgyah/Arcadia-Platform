'use client';

import { useBackgroundStore } from "@/app/store/backgroundStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ContentBackground() {
    const pathName = usePathname()
    const bgUrl = useBackgroundStore((state) => state.bgUrl)
    const setBg = useBackgroundStore((state) => state.setBgUrl)
    const hasCustomBg = useBackgroundStore((state) => state.hasCustomBg)

    useEffect(() => {
        if (!hasCustomBg) {
            switch(true) {
                case (pathName.startsWith('/miru')):
                    setBg('/wallpaper/miru-default.jpg')
                    break;
                case (pathName.startsWith('/asobu')):
                    setBg('/wallpaper/asobu-default.jpg')
                    break;
                default:
                    setBg("/wallpaper/default-wallpaper.jpg")
            }
        }
    }, [pathName, hasCustomBg])
    return (
        <img id="content-wallpaper" src={bgUrl} alt="" />
    )
}