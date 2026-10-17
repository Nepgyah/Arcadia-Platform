import SideNavigation from "../layout/sideNavigation";
import TopNavigation from "../layout/topNavigation";

export default function UIWrapper({children}:{children:React.ReactNode}) {

    return (
        <div id="main-layout">
            <SideNavigation />
            <div id="inner-layout">
                <TopNavigation />
                <div id="content">
                    <div id="content-wrapper">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}