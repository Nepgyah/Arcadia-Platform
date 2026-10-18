'use client';

import { usePathname } from "next/navigation";
import SideNavigation from "../layout/sideNavigation";
import TopNavigation from "../layout/topNavigation";
import { MainURL } from "@/lib/data/urls";
import { URLItem } from "@/types/misc";
import { Theme } from "@chakra-ui/react";

export default function LayoutWrapper({children}:{children:React.ReactNode}) {
    const pathname = usePathname()

    const getURLs = () : URLItem[] => {
        if (pathname.startsWith('/miru')) return []
        else return MainURL
    }

    const currentURLs = getURLs()

    return (
        <Theme colorPalette={'arcadia'}>
            <div id="main-layout">
                <SideNavigation urlSet={currentURLs} />
                <div id="inner-layout">
                    <TopNavigation />
                    <div id="page-content">
                        <div id="content-wrapper">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Theme>
    )
}