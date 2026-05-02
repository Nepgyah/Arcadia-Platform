'use server';

import { ActionResult, GraphqlResponse } from "@/types/api";
import { GameListEntry } from "@/types/asobu";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

interface GameListResponse {
    userGameList: {
        username: string,
        playing: GameListEntry[],
        completed: GameListEntry[],
        planTo: GameListEntry[],
        onHold: GameListEntry[],
        replaying: GameListEntry[]
    }
}

export async function FetchUserGameList(user_id: number) : Promise<ActionResult<GameListResponse>> {
    const query = 
    `
    query($userID: ID!) {
    userGameList(userId: $userID) {
        username,
        playing {
            id,
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
            id,
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
            id,
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
            id,
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
            id,
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
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<GameListResponse>>(query, variables)
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

interface DeleteGameListResponse {
    deleteGameListEntry: {
        message: string
    }
}

export async function DeleteUserListEntry(game_id: number) : Promise<ActionResult<DeleteGameListResponse>> {
    const mutation =
    `
    mutation ($gameID: ID!) {
        deleteGameListEntry(gameId: $gameID) {
            message,
            detail
        }
    }
    `
    
    const variables = { gameID: game_id}
    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<DeleteGameListResponse>>(mutation, variables)
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