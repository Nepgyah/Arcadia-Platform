'use server';

import { Anime } from "@/types/miru";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { ActionResult, GraphqlResponse } from "@/types/api";
import { PaginationResults } from "@/types/pagination";

interface APIResponse {
    searchAnime: {
        animes: Anime[],
        paginationResults: PaginationResults
    }
}

export async function FetchPopularAnimeAction(page: number) : Promise<ActionResult<APIResponse>> {
    const query = 
        `
            query ($page: Int!) {
                searchAnime(
                    filterInput: {
                        type: -1,
                        status: -1,
                        title: "",
                    },
                    sortInput: {
                        category: "users",
                        direction: "desc"
                    },
                    paginationInput: {
                        perPage: 10,
                        targetPage: $page
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
        const variables = { 'page': page}
        try {
            const response = await arcadiaAPI.GraphQL<GraphqlResponse<APIResponse>>(query, variables)
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