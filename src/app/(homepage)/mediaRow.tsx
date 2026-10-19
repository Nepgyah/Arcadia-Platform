import { Media } from "@/types/media"
import { use } from "react"

export default function MediaRow({actionPromise}:{actionPromise: Promise<Media[]>}) {
    const mediaList = use(actionPromise)

    return (
        <p>{mediaList.length}</p>
    )
}