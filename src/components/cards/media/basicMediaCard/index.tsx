import { Media } from "@/types/media";


import '@/styles/components/cards/media/_basic-media-card.scss';
import { AppType } from "@/types/arcadia";
import Link from "next/link";

interface Props {
    media: Media,
    app: AppType,
    href: string
}
export default function BasicMediaCard({ media, app, href}: Props) {

    if(href) {
        return (
            <Link href={href}>
                <div className="basic-media-card">
                    <div className="basic-media-card__image on-hover on-hover--grow">
                        <img src={media.coverImageUrl} alt={media.title} />
                    </div>
                    <p className="basic-media-card__title on-hover on-hover--cursor on-hover--underline">{media.title}</p>
                </div>
            </Link>
        )
    } else {
        return (
            <div className="basic-media-card">
                <div className="basic-media-card__image">
                    <img src={media.coverImageUrl} alt={media.title} />
                </div>
                <p className="basic-media-card__title">{media.title}</p>
            </div>
        )
    }
}