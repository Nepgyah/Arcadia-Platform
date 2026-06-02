'use server';

import { Anime } from "@/types/miru";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { ActionResult, GraphqlResponse } from "@/types/api";
import { PaginationResults } from "@/types/pagination";

interface APIResponse {
    miru: {
        animes: {
            results: Anime[],
            pagination: PaginationResults
        }
    }
}

export async function FetchAllTimeAnimeAction(targetPage: number) : Promise<ActionResult<APIResponse>> {
    const query = 
        `
        query($targetPage: Int!) {
            miru {
                animes(
                    sort: {
                        category: "score",
                        direction: "desc"
                    },
                        pagination: {
                        perPage: 12,
                        targetPage: $targetPage
                    }) {
                    results {
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
                    pagination {
                        perPage,
                        totalPages,
                        totalItems
                    }
                }
            }
        }
    `

    const variables = { "targetPage": targetPage}
    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<APIResponse>>(query, variables)
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