import SideNav from "@/components/navigation/sideNav"
import TopNav from "@/components/navigation/topNav"

export default function Layout(
    {
        children
    } : {
        children : React.ReactNode
    }
) {
    return (
        <div id="main-layout">
            <TopNav />
            <div className="side-layout">
                <SideNav />
                <div id="content">
                    {children}
                </div>
            </div>
        </div>
    )
}