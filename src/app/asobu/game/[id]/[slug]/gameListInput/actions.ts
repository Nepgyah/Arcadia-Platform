'use server';

import { ActionResult, GraphqlResponse } from "@/types/api";
import { GameListEntry } from "@/types/asobu";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

interface EntryResponse {
    gameListEntry : GameListEntry
}
export async function FetchUserGameListEntry(gameID: number) : Promise<ActionResult<EntryResponse>> {
    const query =
    `
    query ($gameID: ID!) {
        gameListEntry(gameId: $gameID) {
            id,
            status,
            score
        }
    }
    `
    const variables = {
        'gameID': gameID
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<EntryResponse>>(query, variables);
        return {
            success: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}