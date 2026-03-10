import { url } from "@/utils/data/urls"
import Link from "next/link"

export default function SideNav(
    {
        urlSet
    } : {
        urlSet: url[]
    }
) {
    return (
        <div id="side-nav">
            <div className="icon">
                <Link href={'/'}>
                    <img src="/logos/logo_white.svg" alt="" />
                </Link>
            </div>
            <div className="links">
                {
                    urlSet.map((url, idx) => (
                        <Link key={idx} href={url.path}>{url.title}</Link>
                    ))
                }
            </div>
        </div>
    )
}