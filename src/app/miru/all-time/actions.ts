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

export async function FetchAllTimeAnimeAction(targetPage: number) : Promise<ActionResult<APIResponse>> {
    const query = 
        `
        query ($targetPage: Int!){
            searchAnime(
                filterInput: {
                    type: -1,
                    status: -1,
                    title: "",
                },
                sortInput: {
                    category: "score",
                    direction: "desc"
                },
                paginationInput: {
                    perPage: 10,
                    targetPage: $targetPage
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
                paginationResults {
                    perPage,
                    totalPages,
                    totalItems
                }
            }
        }
    `

    const variables = { targetPage: targetPage}
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