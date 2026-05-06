import { Tooltip } from "@/components/ui/tooltip"
import Link from "next/link"

export default function DetailMediaCard(
    {
        href, title, summary, users, score, src, franchise
    } : {
        href: string,
        title: string,
        summary: string,
        users: number,
        score: number,
        src: string,
        franchise: any
    }
) {
    return (
        <div className="detail-media card">
            <div className="detail-media__title">
                <Tooltip content={title}>
                    <Link href={href} className="hover-underline">{title}</Link>
                </Tooltip>
            </div>
            <div className="detail-media__metrics">
                <p>Users: {users}</p>
                <p>Score: {score}</p>
            </div>
            <div className="detail-media__main">
                <img src={src} alt="" />
                <div className="description" dangerouslySetInnerHTML={{ __html: summary }}>
                </div>
            </div>
            <div className="detail-media__franchise">
                {
                    franchise ? <p>Franchise: {franchise.name}</p> : ''
                }
            </div>
        </div>
    )
}