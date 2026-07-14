'use server';

import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { APIMetadata, MutationResponse } from "@/types/api";
import { MediaReview, MediaReviewInput } from "@/types/base";

interface CreateAnimeReviewResponse {
    createAnimeReview: {
        review: MediaReview
    }
}
export async function CreateAnimeReivew(animeID: number, details: MediaReviewInput) : Promise<MutationResponse<CreateAnimeReviewResponse>> {
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