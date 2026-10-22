'use client';

import { usePathname } from "next/navigation";
import SideNavigation from "../layout/sideNavigation";
import TopNavigation from "../layout/topNavigation";
import { MainURL } from "@/lib/data/urls";
import { URLItem } from "@/types/misc";
import { Theme, useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
import MobileNavigation from "../layout/mobileNavigation";

export default function LayoutWrapper({children}:{children:React.ReactNode}) {

    const [isMobile] = useMediaQuery(["(max-width: 899px)"]);
    const pathname = usePathname()

    const getURLs = () : URLItem[] => {
        if (pathname.startsWith('/miru')) return []
        else return MainURL
    }

    const currentURLs = getURLs()

    return (
        <Theme colorPalette={'arcadia'}>
            {
                isMobile ?
                <div id="mobile-layout">
                    <MobileNavigation urlSet={currentURLs} />
                    <div id="page-content">
                        {children}
                    </div>
                </div>
                :

                <div id="desktop-layout">
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
            }
        </Theme>
    )
}