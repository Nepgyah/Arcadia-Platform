'use server';

import { ActionResult, GraphqlResponse, Pagination } from "@/types/api";
import { Anime } from "@/types/miru";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

interface APIResponse {
    searchAnime: {
        animes: Anime[],
        currentPage: number,
        pageCount: number,
        total: number
    }
}

export async function FetchAnimeSearchAction(
    mediaType: number,
    mediaStatus: number,
    mediaTitle: string,
    sortCategory: string,
    sortDirection: string,
    pagination: Pagination
) : Promise<ActionResult<APIResponse>> {
    const query = 
    `
        query (
            $mediaType: Int!, 
            $mediaStatus: Int!, 
            $mediaTitle: String!,
            $sortCategory: String!,
            $sortDirection: String!,
            $perPage: Int!,
            $currentPage: Int!
        ) {
            searchAnime(
                filters: {
                    type: $mediaType,
                    status: $mediaStatus,
                    title: $mediaTitle,
                },
                sort: {
                    category: $sortCategory,
                    direction: $sortDirection
                },
                pagination: {
                    perPage: $perPage,
                    currentPage: $currentPage
                }
            ) {
                animes {
                    id,
                    title,
                    score,
                    users,
                    summary,
                    slug,
                    franchise {
                        name
                    }
                },
                currentPage,
                pageCount,
                total
            }
        }
    `

    const variables = {
        'mediaType': mediaType,
        'mediaStatus': mediaStatus,
        'mediaTitle': mediaTitle,
        'sortCategory': sortCategory,
        'sortDirection': sortDirection,
        'perPage': pagination.perPage,
        'currentPage': pagination.currentPage
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<APIResponse>>(query, variables);
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