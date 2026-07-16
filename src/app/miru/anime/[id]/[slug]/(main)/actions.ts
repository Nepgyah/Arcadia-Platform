'use server';

import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { GETResponse, POSTResponse } from "@/types/api";
import { MediaReview, MediaReviewInput } from "@/types/base";

interface GetAnimeReviewResponse {
    miru: {
        review: MediaReview
    }
}

export async function GetAnimeReview(animeID: number) : Promise<GETResponse<GetAnimeReviewResponse>> {
    const query = `
        query($animeID: Int!) {
            miru {
                review(animeId: $animeID) {
                    text,
                    score
                }
            }
        }
    `
    const variables = { 'animeID': Number(animeID) }
    return await arcadiaAPI.GraphQuery<GetAnimeReviewResponse>(query, variables)
}

interface CreateAnimeReviewResponse {
    createAnimeReview: {
        review: MediaReview
    }
}
export async function CreateAnimeReivew(animeID: number, details: MediaReviewInput) : Promise<POSTResponse<CreateAnimeReviewResponse>> {
    const mutation = `
    mutation($animeID: Int!, $details: MediaReviewInput!) {
        createAnimeReview(animeId: $animeID, details: $details) {
            review {
                text
            },
            message,
            detail
        }
    }
    `

    const variables = {
        'animeID': Number(animeID),
        'details': details
    }

    return await arcadiaAPI.GraphMutation<CreateAnimeReviewResponse>(mutation, variables)
}

interface UpdateAnimeReviewResponse {
    updateAnimeReview: {
        review: MediaReview
    }
}
export async function UpdateAnimeReview(animeID: number, details: MediaReviewInput) : Promise<POSTResponse<UpdateAnimeReviewResponse>> {
    const mutation = `
    mutation($animeID: Int!, $details: MediaReviewInput!) {
        updateAnimeReview(animeId: $animeID, details: $details) {
            review {
                text
            },
            message,
            detail
        }
    }
    `

    const variables = {
        'animeID': Number(animeID),
        'details': details
    }

    return await arcadiaAPI.GraphMutation<UpdateAnimeReviewResponse>(mutation, variables)
}

interface DeleteAnimeReviewResponse {
    deleteAnimeReview: {}
}
export async function DeleteAnimeReview(animeID: number) : Promise<POSTResponse<DeleteAnimeReviewResponse>> {
    const mutation = `
    mutation($animeID: Int!) {
        deleteAnimeReview(animeId: $animeID) {
            message,
            detail
        }
    }
    `

    const variables = { 'animeID': Number(animeID) }

    return await arcadiaAPI.GraphMutation<DeleteAnimeReviewResponse>(mutation, variables)
}

// interface GetAnimeListResponse {

// }

// export async function GetAnimeList(animeID: number) : Promise<POSTResponse<GetAnimeListResponse>> {
    
// }