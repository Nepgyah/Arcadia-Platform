'use server';

import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { APIResponseMetadata, APIResult, MutationResponse } from "@/types/api";
import { MediaReview, MediaReviewInput } from "@/types/base";

interface CreateAnimeReviewResponse {
    createAnimeReview: APIResponseMetadata & {
        review: MediaReview
    }
}
export async function CreateAnimeReivew(animeID: number, details: MediaReviewInput) : Promise<MutationResponse<CreateAnimeReviewResponse>> {
    console.log('ACTION', animeID, details)
    const mutation = `
    mutation($animeID: Int!, $details: MediaReviewInput!) {
        createAnimeReview(animeId: $animeID, details: $details) {
            message,
            detail
        }
    }
    `

    const variables = {
        'animeID': Number(animeID),
        'details': details
    }

    const response = await arcadiaAPI.GraphMutation<CreateAnimeReviewResponse>(mutation, variables)
    if (response.success) {
        return {
            success: true,
            message: response.result.createAnimeReview.message,
        }
    } else {
        return {
            success: false,
            message: response.error
        }
    }
}