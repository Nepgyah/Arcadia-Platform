import { Media } from "@/types/base"
import Link from "next/link"

export default function RelatedMedia(
    {
        media, app, relation, link, src
    } : {
        media: Media,
        app: 'miru' | 'asobu' | 'yomu',
        link: string,
        relation: string,
        src: string
    }
) {

    return (
        <div className="relation-media">
            <Link href={link}>
                <img className="border-radius-md shadow animation-hover" src={src} alt={media.title} />
            </Link>
            <div>
                <Link href={link} className="hover-underline">{media.title}</Link>
                <p className="clr-txt-fadded">{relation}</p>
            </div>
        </div>
    )
}