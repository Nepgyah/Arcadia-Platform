'use server';

import { ActionResult, GraphqlResponse, PaginationInput } from "@/types/api";
import { Anime, AnimeFilterInput } from "@/types/miru";
import { PaginationResults, SortInput } from "@/types/pagination";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";

interface APIResponse {
    miru: {
        animes: {
            results: Anime[],
            pagination: PaginationResults
        }
    }
}

export async function FetchAnimeSearchAction(
    filterInput: AnimeFilterInput,
    sortInput: SortInput,
    paginationInput: PaginationInput
) : Promise<ActionResult<APIResponse>> {
    const query = 
    `
        query (
            $filterInput: AnimeFilterInput!,
            $sortInput: SortInput!,
            $paginationInput: PaginationInput!
        ) {
            miru {
                animes(
                filters: $filterInput,
                sort: $sortInput,
                pagination: $paginationInput) {
                    results {
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
                    pagination {
                        perPage,
                        totalPages,
                        totalItems
                    }
                }
            }
        }
    `
    const variables = {
        filterInput: filterInput,
        sortInput: sortInput,
        paginationInput: paginationInput
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