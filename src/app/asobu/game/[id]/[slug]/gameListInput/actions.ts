'use server';

import { ActionResult, GraphqlResponse } from "@/types/api";
import { GameListEntry, GameListEntryMetadata } from "@/types/asobu";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { MediaReview } from "@/types/base";
import { success } from "zod";

interface UserDataResponse {
    gameListEntry: GameListEntry,
    userGameReview: MediaReview
}
export async function FetchUserGameListEntry(gameID: number) : Promise<ActionResult<UserDataResponse>> {
    const query =
    `
    query ($gameID: ID!) {
        gameListEntry(gameId: $gameID) {
            id,
            status,
            score,
        },
        userGameReview(gameId: $gameID) {
            id,
            text
        }
    }
    `
    const variables = {
        'gameID': gameID
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<UserDataResponse>>(query, variables);
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

interface CreateResponse {
    createGameListEntry : {
        message: string,
        gameEntry: GameListEntry
    }
}
export async function CreateGameListEntry(gameID: number, status: number, details: GameListEntryMetadata) : Promise<ActionResult<CreateResponse>> {
    const mutation = 
    `
    mutation ($gameID: ID!, $status: Int!, $details: GameListEntryMetadata!) {
        createGameListEntry(gameId: $gameID, status: $status, details: $details) {
            message,
            detail,
            gameEntry {
                status,
                score
            }
        }
    }
    `

    const variables = {
        'gameID': gameID,
        'status': status,
        'details': details
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<any>>(mutation, variables);
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

interface UpdateResponse {
    updateGameListEntry : {
        message: string,
        gameEntry: GameListEntry
    }
}
export async function UpdateeGameListEntry(gameID: number, status: number, details: GameListEntryMetadata) : Promise<ActionResult<UpdateResponse>> {
    const mutation = 
    `
    mutation ($gameID: ID!, $status: Int!, $details: GameListEntryMetadata!) {
        updateGameListEntry(gameId: $gameID, status: $status, details: $details) {
            message,
            detail,
            gameEntry {
                status,
                score
            }
        }
    }
    `

    const variables = {
        'gameID': gameID,
        'status': status,
        'details': details
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<UpdateResponse>>(mutation, variables);
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

interface CreateGameReviewResponse {
    createGameReview: {
        message: string,
        detail: string,
        review: MediaReview
    }
}
export async function CreateGameReview(gameID: number, text: string) : Promise<ActionResult<CreateGameReviewResponse>> {
    const mutation = `
    mutation ($gameId: ID!, $reviewText: String!) {
        createGameReview(gameId: $gameId, reviewText: $reviewText) {
            detail,
            message,
            review {
                id
            }
        }
    }
    `
    const variables = {
        gameId: gameID,
        reviewText: text
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<CreateGameReviewResponse>>(mutation, variables)
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

interface UpdateGameReviewResponse {
    updateGameReview: {
        message: string,
        detail: string,
        review: MediaReview
    }
}
export async function UpdateGameReview(gameID: number, text: string) : Promise<ActionResult<UpdateGameReviewResponse>> {
    const mutation = `
    mutation ($gameId: ID!, $reviewText: String!) {
        updateGameReview(gameId: $gameId, reviewText: $reviewText) {
            detail,
            message,
            review {
                id
            }
        }
    }
    `
    const variables = {
        gameId: gameID,
        reviewText: text
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<UpdateGameReviewResponse>>(mutation, variables)
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

interface DeleteGameReviewResponse {
    deleteGameReview: {
        message: string,
        detail: string,
        review: MediaReview
    }
}
export async function DeleteGameReview(gameID: number) : Promise<ActionResult<DeleteGameReviewResponse>> {
    const mutation = `
    mutation ($gameId: ID!) {
        deleteGameReview(gameId: $gameId) {
            message,
        }
    }
    `
    const variables = {
        gameId: gameID,
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<DeleteGameReviewResponse>>(mutation, variables)
        return {
            success: true,
            data: response.data,
        }
    } catch(error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}