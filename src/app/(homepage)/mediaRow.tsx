import BasicMediaCard from "@/components/cards/media/basicMediaCard"
import { Media } from "@/types/media"
import { App } from "@/types/misc"
import { use } from "react"

export default function MediaRow({actionPromise, app}:{actionPromise: Promise<Media[]>, app: App}) {
    const mediaList = use(actionPromise)

    return (
        <div className="media-row grid grid--5 grid--gap-md">
            {
                mediaList.map((media: Media, idx: number) => (
                    <BasicMediaCard 
                        key={idx} 
                        media={media}
                        app={app}
                    />
                ))
            }
        </div>
    )
}