import { Media } from "@/types/base"
import Link from "next/link"

export default function(
    {
        media, app, relation, link
    } : {
        media: Media,
        app: 'miru' | 'asobu' | 'yomu',
        link: string,
        relation: string
    }
) {

    return (
        <div className="relation-media">
            <Link href={link}>
                <img className="border-radius-md shadow animation-hover" src={`/storage/${app}/${media.id}.jpg`} alt="" />
            </Link>
            <div>
                <Link href={link} className="hover-underline">{media.title}</Link>
                <p className="clr-txt-fadded">{relation}</p>
            </div>
        </div>
    )
}