import { url } from "@/lib/urls"
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
                        <div key={url.path} className="flex col-gap-sm">
                            <url.icon />
                            <Link className="txt-md" key={idx} href={url.path}>{url.title}</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}