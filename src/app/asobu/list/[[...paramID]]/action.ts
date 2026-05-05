'use server';

import { ActionResult, GraphqlResponse, RESTResponse } from "@/types/api";
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
            endPlayDate,
            note
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
            endPlayDate,
            note
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
            endPlayDate,
            note
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
            endPlayDate,
            note 
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
            endPlayDate,
            note  
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

export async function DeleteUserListEntry(entry_id: number) : Promise<ActionResult<DeleteGameListResponse>> {
    const mutation =
    `
    mutation ($entryID: ID!) {
        deleteGameListEntry(entryId: $entryID) {
            message,
            detail
        }
    }
    `
    
    const variables = { entryID: entry_id}
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

export async function ExportGameList() : Promise<any> {
    try {
        const response = await arcadiaAPI.GET<RESTResponse<any>>('asobu/export-list/')
        console.log(response.data)
        return {
            success: true,
            data: null
        }
    } catch(error: any) {
        return {
            success: false,
            error: 'An error occured exporting gamelist'
        }
    }
}