'use server';

import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { ActionResult, GraphqlResponse } from "@/types/api";

interface FetchAnimeListEntryResponse {
    getAnimeListEntry: {
        status: number,
        currentEpisode: number,
        startWatchDate: string,
        endWatchDate: string,
        score: number
    }
}

export async function FetchAnimeListEntryAction(animeID: number) : Promise<ActionResult<FetchAnimeListEntryResponse>> {
    const query =
    `
    query ($animeID: ID!) {
        getAnimeListEntry(animeId: $animeID) {
            status,
            currentEpisode,
            startWatchDate,
            endWatchDate,
            score
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
    status: number,
    details: {
        score: number | null,
        currentEpisode: number,
        startWatchDate: string | null,
        endWatchDate: string | null
    }
) : Promise<ActionResult<any>> {
    const mutation =
    `
    mutation (
        $animeID: ID!, 
        $status: Int!, 
        $details: AnimeListEntryMetaData
    ) {
        addAnimeListEntry(
            animeId: $animeID,
            status: $status,
            details: $details
        ) {
            message,
            animeEntry {
                id
            }
        }
    }
    `
    const variables = {
        animeID: animeID,
        status: status,
        details: {
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
    status: number,
    details: {
        score: number | null,
        currentEpisode: number,
        startWatchDate: string | null,
        endWatchDate: string | null
    }
) : Promise<ActionResult<UpdateAnimeListData>> {
    const mutation =
    `
    mutation (
        $animeID: ID!, 
        $status: Int!, 
        $details: AnimeListEntryMetaData
    ) {
        updateAnimeListEntry(
            animeId: $animeID,
            status: $status,
            details: $details
        ) {
            message,
            animeEntry {
                id
            }
        }
    }
    `
    const variables = {
        animeID: animeID,
        status: status,
        details: {
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