'use client';

import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import SideNav from "@/components/layout/sideNav"
import TopNav from "@/components/layout/topNav"
import { asobuNav, mainboard, miruNav } from "@/lib/urls";
import { usePathname } from "next/navigation"
import { useBackgroundStore } from "./store/backgroundStore";

export default function WrapperUI({children}:{children:React.ReactNode}) {
    const pathname = usePathname()
    const bgUrl = useBackgroundStore((state) => state.bgUrl);

    const getNav = () : any => {
        if (pathname.startsWith('/miru')) return miruNav
        if (pathname.startsWith('/asobu')) return asobuNav
        else return mainboard
    }

    const nav = getNav()
    return (
        <div id="main-layout">
            <SideNav urlSet={nav} />
            <div id="inner-layout">
                <TopNav urlSet={nav} />
                <div id="content">
                    {
                        bgUrl &&
                        <img id="content-wallpaper" src={bgUrl} alt="" />
                    }
                    <div id="content-wrapper">
                        <Breadcrumbs />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}