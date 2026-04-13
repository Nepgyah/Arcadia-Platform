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

export async function FetchAllTimeAnimeAction(page: number) : Promise<ActionResult<APIResponse>> {
    const query = 
        `
        query {
            searchAnime(
                filters: {
                    type: -1,
                    status: -1,
                    title: "",
                },
                sort: {
                    category: "score",
                    direction: "desc"
                },
                pagination: {
                    perPage: 10,
                    currentPage: ${page}
                }
            ) {
                animes {
                    id,
                    title,
                    coverImgUrl,
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

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<APIResponse>>(query)
        return {
            success: true,
            data: response.data
        }
    } catch(e: any) {
        return {
            success: false,
            error: e.message
        }
    }
}