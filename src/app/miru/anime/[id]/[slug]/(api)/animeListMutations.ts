import { toaster } from "@/components/ui/toaster"
import { arcadiaClientFetch } from "@/utils/api/arcadia/arcadiaClient"
import { arcadiaServerFetch } from "@/utils/api/arcadia/arcadiaServer"

export async function CreateNewAnimeListEntry(
    animeID: number,
    status: number,
    details: {
        score: number | null,
        currentEpisode: number,
        startWatchDate: string | null,
        endWatchDate: string | null
    }
) {
    const mutation =
    `
    mutation {
        addAnimeListEntry(
            animeId: ${animeID},
            status: ${status},
            details: {
            score: ${details.score},
            currentEpisode: ${details.currentEpisode},
            startWatchDate: ${details.startWatchDate ? `"${details.startWatchDate}"` : null},
            endWatchDate: ${details.endWatchDate ? `"${details.endWatchDate}"` : null}
            }
        ) {
            message
        }
    }
    `

    const response = await arcadiaClientFetch.GraphQL<any>(mutation)
    const message = response.data.addAnimeListEntry?.message
    if (message) {
        toaster.create({
            title: message,
            type: 'success'
        })
    }
}

export async function UpdateNewAnimeListEntry(
    animeID: number,
    status: number,
    details: {
        score: number | null,
        currentEpisode: number,
        startWatchDate: string | null,
        endWatchDate: string | null
    }
) {
    console.log('UPDATING')
    const mutation =
    `
    mutation {
        updateAnimeListEntry(
            animeId: ${animeID},
            status: ${status},
            details: {
            score: ${details.score},
            currentEpisode: ${details.currentEpisode},
            startWatchDate: ${details.startWatchDate ? `"${details.startWatchDate}"` : null},
            endWatchDate: ${details.endWatchDate ? `"${details.endWatchDate}"` : null}
            }
        ) {
            message
        }
    }
    `

    const response = await arcadiaClientFetch.GraphQL<any>(mutation)
    const message = response.data.updateAnimeListEntry?.message
    if (message) {
        toaster.create({
            title: message,
            type: 'success'
        })
    }
}