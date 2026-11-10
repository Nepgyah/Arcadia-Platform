import BasicMediaCard from "@/components/cards/media/basicMediaCard"
import { AppType } from "@/types/arcadia"
import { Media } from "@/types/media"
import { use } from "react"

export default function MediaRow({actionPromise, app}:{actionPromise: Promise<Media[]>, app: AppType}) {
    const mediaList = use(actionPromise);
    let mediaType = '';

    switch(app) {
        case 'miru':
            mediaType = 'anime';
            break;
        case 'asobu':
            mediaType = 'game';
            break;
        default:
            mediaType = 'arc'
    }
    return (
        <div className="media-row gap-md">
            {
                mediaList.map((media: Media, idx: number) => (
                    <BasicMediaCard 
                        key={idx} 
                        media={media}
                        app={app}
                        href={`${app}/${mediaType}/${media.id}/${media.slug}`}
                    />
                ))
            }
        </div>
    )
}