'use server';

import { ActionResult, GraphqlResponse, MessagedActionResult } from "@/types/api";
import { GameListEntry, GameListEntryMetadata } from "@/types/asobu";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { MediaReview } from "@/types/base";

interface UserDataResponse {
    asobu: {
        userGameListEntry: GameListEntry
    }
}
export async function FetchUserGameListEntry(gameID: number) : Promise<ActionResult<UserDataResponse>> {
    const query =
    `
    query($gameID: Int!) {
        asobu {
            userGameListEntry(gameId: $gameID) {
                status,
                score
            }
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
export async function CreateGameListEntry(gameID: number, details: GameListEntryMetadata) : Promise<ActionResult<CreateResponse>> {
    const mutation = 
    `
    mutation($gameID: Int!, $details: GameListDetails!){
        createGameListEntry(
            gameId: $gameID,
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
        'gameID': gameID,
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
export async function UpdateGameListEntry(gameID: number, details: GameListEntryMetadata) : Promise<ActionResult<UpdateResponse>> {
    const mutation = 
    `
    mutation($gameID: Int!, $details: GameListDetails!){
        updateGameListEntry(
            gameId: $gameID,
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
        'gameID': gameID,
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

interface DeleteListResponse {
    deleteGameListEntry : {
        message: string,
    }
}
export async function DeleteGameListEntry(gameID: number) : Promise<ActionResult<DeleteListResponse>> {
    const mutation = 
    `
    mutation($gameID: Int!){
        deleteGameListEntry(
            gameId: $gameID,
        ) {
            message,
            entry {
            id
            }
        }
    }
    `

    const variables = { 'gameID': gameID }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<DeleteListResponse>>(mutation, variables);
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

// Game Review
interface CreateGameReviewResponse {
    createGameReview: {
        message: string,
        detail: string,
        review: MediaReview
    }
}
export async function CreateGameReview(gameID: number, text: string) : Promise<MessagedActionResult<CreateGameReviewResponse>> {
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
            data: response.data,
            toasterMessage: response.data.createGameReview.message
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
export async function UpdateGameReview(gameID: number, text: string) : Promise<MessagedActionResult<UpdateGameReviewResponse>> {
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
            data: response.data,
            toasterMessage: response.data.updateGameReview.message
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
export async function DeleteGameReview(gameID: number) : Promise<MessagedActionResult<DeleteGameReviewResponse>> {
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
            toasterMessage: response.data.deleteGameReview.message
        }
    } catch(error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}