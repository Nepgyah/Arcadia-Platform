import { toaster } from "@/components/ui/toaster"
import { arcadiaAPI } from "@/utils/api/arcadiaAPI"

export async function CreateNewAnimeListEntry(
    userID: number, 
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
            userId: ${userID},
            animeId: ${animeID},
            status: ${status},
            details: {
            score: ${details.score},
            currentEpisode: ${details.currentEpisode},
            startWatchDate: ${details.startWatchDate ? `"${details.startWatchDate}"` : null},
            endWatchDate: ${details.endWatchDate ? `"${details.endWatchDate}"` : null}
            }
        ) {
            ok
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(mutation)
    if (response.data.addAnimeListEntry.ok == true) {
        toaster.create({
            description: "Added to your anilist!",
            type: "success"
        })
    } else {
        toaster.create({
            description: "Error adding to your anilist. Try again later.",
            type: "error"
        })
    }
}

export async function UpdateNewAnimeListEntry(
    userID: number, 
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
        updateAnimeListEntry(
            userId: ${userID},
            animeId: ${animeID},
            status: ${status},
            details: {
            score: ${details.score},
            currentEpisode: ${details.currentEpisode},
            startWatchDate: ${details.startWatchDate ? `"${details.startWatchDate}"` : null},
            endWatchDate: ${details.endWatchDate ? `"${details.endWatchDate}"` : null}
            }
        ) {
            ok
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(mutation)
    if (response.data.updateAnimeListEntry.ok == true) {
        toaster.create({
            description: "You have updated your anilist",
            type: "success"
        })
    } else {
        toaster.create({
            description: "Error updating your anilist. Try again later.",
            type: "error"
        })
    }
}