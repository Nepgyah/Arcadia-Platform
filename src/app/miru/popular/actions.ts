'use server';

import { Anime } from "@/types/miru";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { ActionResult, GraphqlResponse } from "@/types/api";

interface APIResponse {
    searchAnime: {
        animes: Anime[],
        total: number
    }
}

export async function FetchPopularAnimeAction(page: number) : Promise<ActionResult<APIResponse>> {
    const query = 
        `
            query ($page: Int!) {
                searchAnime(
                    filters: {
                        type: -1,
                        status: -1,
                        title: "",
                    },
                    sort: {
                        category: "users",
                        direction: "desc"
                    },
                    pagination: {
                        perPage: 10,
                        currentPage: $page
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
                    currentPage,
                    pageCount,
                    total
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