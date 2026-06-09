'use server';

import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { ActionResult, GraphqlResponse } from "@/types/api";
import { AnimeListEntry } from "@/types/miru";

interface FetchAnimeListEntryResponse {
    miru: {
        animeEntry: AnimeListEntry
    }
}

export async function FetchAnimeListEntryAction(animeID: number) : Promise<ActionResult<FetchAnimeListEntryResponse>> {
    const query =
    `
    query ($animeID: Int!) {
        miru {
            animeEntry(animeId: $animeID) {
                status,
                score,
                currentEpisode
            }
        }
    }
    `
    const variables = { animeID: animeID }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<FetchAnimeListEntryResponse>>(query, variables)
        return {
            success: true,
            data: response.data
        }
    } catch (e: any) {
        return {
            success: false,
            error: e.message
        }
    }
}

export async function AddAnimeListEntryAction(
    animeID: number,
    details: {
        status: number,
        score: number | null,
        currentEpisode: number,
        startWatchDate: string | null,
        endWatchDate: string | null
    }
) : Promise<ActionResult<any>> {
    const mutation =
    `
    mutation (
        $animeID: Int!, 
        $details: AnimeListDetails!
    ) {
        createAnimeListEntry(
            animeId: $animeID,
            details: $details
        ) {
            message,
            entry {
                id
            }
        }
    }
    `
    const variables = {
        animeID: animeID,
        details: {
            status: details.status,
            score: details.score,
            currentEpisode: details.currentEpisode,
            startWatchDate: details.startWatchDate,
            endWatchDate: details.endWatchDate
        }
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<FetchAnimeListEntryResponse>>(mutation, variables)
        return {
            success: true,
            data: null
        }
    } catch(error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

interface UpdateAnimeListData {
    updateAnimeListEntry: {
        animeEntry: {
            id: number
        }
    }
}
export async function UpdateAnimeListEntryAction(
    animeID: number,
    details: {
        status: number,
        score: number | null,
        currentEpisode: number,
        startWatchDate: string | null,
        endWatchDate: string | null
    }
) : Promise<ActionResult<UpdateAnimeListData>> {
    const mutation =
    `
    mutation (
        $animeID: Int!, 
        $details: AnimeListDetails!
    ) {
        updateAnimeListEntry(
            animeId: $animeID,
            details: $details
        ) {
            message,
            entry {
                id
            }
        }
    }
    `
    const variables = {
        animeID: animeID,
        details: {
            status: details.status,
            score: details.score,
            currentEpisode: details.currentEpisode,
            startWatchDate: details.startWatchDate,
            endWatchDate: details.endWatchDate
        }
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<UpdateAnimeListData>>(mutation, variables)
        return {
            success: true,
            data: response.data
        }
    } catch(error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}