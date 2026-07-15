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
    console.log('READING')
    const variables = { 'animeID': Number(animeID) }
    return await arcadiaAPI.GraphQuery<GetAnimeReviewResponse>(query, variables)
}

interface CreateAnimeReviewResponse {
    createAnimeReview: {
        review: MediaReview
    }
}
export async function CreateAnimeReivew(animeID: number, details: MediaReviewInput) : Promise<POSTResponse<CreateAnimeReviewResponse>> {
    console.log('ACTION', animeID, details)
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