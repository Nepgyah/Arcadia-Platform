'use server';

import { ActionResult, GraphqlResponse, Pagination } from "@/types/api";
import { Anime } from "@/types/miru";
import { PaginationResults } from "@/types/pagination";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";

interface APIResponse {
    searchAnime: {
        animes: Anime[],
        paginationResults: PaginationResults
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
                filterInput: {
                    type: $mediaType,
                    status: $mediaStatus,
                    title: $mediaTitle,
                },
                sortInput: {
                    category: $sortCategory,
                    direction: $sortDirection
                },
                paginationInput: {
                    perPage: $perPage,
                    targetPage: $currentPage
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
                    },
                    coverImgUrl
                },
                paginationResults {
                    perPage,
                    totalPages,
                    totalItems
                }
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