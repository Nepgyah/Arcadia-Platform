'use server';

import { AnimeListEntry } from "@/types/miru";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { ActionResult, GraphqlResponse } from "@/types/api";

interface APIResponse {
    getAnimeList: {
        username: string,
        watching: AnimeListEntry[],
        completed: AnimeListEntry[],
        planTo: AnimeListEntry[],
        onHold: AnimeListEntry[]
    }
}

export async function FetchAnimeListAction(userID: number) : Promise<ActionResult<APIResponse>> {
    const query = `
    query ($userId: ID!) {
        getAnimeList(userId: $userId) {
            username,
            watching {
                anime {
                    id,
                    slug,
                    title
                },
                score,
                startWatchDate,
                endWatchDate
            },
            completed {
                anime {
                    id,
                    slug,
                    title
                },
                score,
                startWatchDate,
                endWatchDate
            },
            planTo {
                anime {
                    id,
                    slug,
                    title
                },
                score,
                startWatchDate,
                endWatchDate
            },
            onHold {
                anime {
                    id,
                    slug,
                    title
                },
                score,
                startWatchDate,
                endWatchDate
            }
        }
    }
    `

    const variables = { 'userId' : userID};
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