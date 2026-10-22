import { Media } from "@/types/media";
import { App } from "@/types/misc";

import '@/styles/components/cards/media/_basic-media-card.scss';

interface Props {
    media: Media,
    app: App
}
export default function BasicMediaCard({ media, app}: Props) {

    return (
        <div className="basic-media-card">
            <div className="basic-media-card__image">
                <img src={media.coverImageUrl} alt={media.title} />
            </div>
            <p className="basic-media-card__title on-hover on-hover--cursor on-hover--underline">{media.title}</p>
        </div>
    )
}