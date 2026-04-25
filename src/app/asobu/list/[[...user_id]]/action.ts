'use server';

import { ActionResult, GraphqlResponse } from "@/types/api";
import { GameListEntry } from "@/types/asobu";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

interface APIResponse {
    userGameList: {
        username: string,
        playing: GameListEntry[],
        completed: GameListEntry[],
        planTo: GameListEntry[],
        onHold: GameListEntry[],
        replaying: GameListEntry[]
    }
}

export async function FetchUserGameList(user_id: number) : Promise<ActionResult<APIResponse>> {
    const query = 
    `
    query($userID: ID!) {
    userGameList(userId: $userID) {
        username,
        playing {
            game {
                id,
                title,
                slug
            },
            status,
            score,
            note,
            review,
            startPlayDate,
            endPlayDate     
        },
        completed {
            game {
                id,
                title,
                slug
            },
            status,
            score,
            note,
            review,
            startPlayDate,
            endPlayDate  
        },
        onHold {
            game {
                id,
                title,
                slug
            },
            status,
            score,
            note,
            review,
            startPlayDate,
            endPlayDate  
        },
        planTo {
            game {
                id,
                title,
                slug
            },
            status,
            score,
            note,
            review,
            startPlayDate,
            endPlayDate  
        },
        replaying {
            game {
                id,
                title,
                slug
            },
            status,
            score,
            note,
            review,
            startPlayDate,
            endPlayDate  
            }
        }
    }
    `

    const variables = { 'userID': user_id }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<APIResponse>>(query, variables)
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