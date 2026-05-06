'use client';

import Breadcrumbs from "@/components/navigation/breadcrumbs";
import SideNav from "@/components/layout/sideNav"
import TopNav from "@/components/layout/topNav"
import { mainboard, miruNav } from "@/lib/urls";
import { usePathname } from "next/navigation"

export default function Layout(
    {
        children
    } : {
        children : React.ReactNode
    }
) {

    const pathname = usePathname()

    const getNav = () : any => {
        if (pathname.startsWith('/miru')) return miruNav
        else return mainboard
    }

    const nav = getNav()
    return (
        <div id="main-layout">
            <TopNav urlSet={nav} />
            <div id="second-layout">
                <SideNav urlSet={nav} />
                <div id="content">
                    <div id="content-wrapper">
                        <Breadcrumbs />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}