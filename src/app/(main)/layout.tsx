'use client';

import Breadcrumbs from "@/components/navigation/breadcrumbs";
import SideNav from "@/components/navigation/sideNav"
import TopNav from "@/components/navigation/topNav"
import { mainboard, miruNav } from "@/utils/data/urls";
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
            <TopNav />
            <div id="second-layout">
                <SideNav urlSet={nav} />
                <div id="content">
                    <Breadcrumbs />
                    {children}
                </div>
            </div>
        </div>
    )
}