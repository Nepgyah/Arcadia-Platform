'use server';

import { AnimeListEntry } from "@/types/miru";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { ActionResult, GraphqlResponse } from "@/types/api";

interface APIResponse {
    miru: {
        userAnimeList: {
            user: string,
            watching: AnimeListEntry[],
            completed: AnimeListEntry[],
            planTo: AnimeListEntry[],
            onHold: AnimeListEntry[]
        }
    }
}

export async function FetchAnimeListAction(profileID: number) : Promise<ActionResult<APIResponse>> {
    const query = `
    query($profileID: Int!) {
        miru {
            userAnimeList(profileId: $profileID) {
                user,
                watching {
                    anime {
                        id,
                        slug,
                        title
                    },
                    startWatchDate,
                    endWatchDate
                },
                completed {
                    anime {
                        id,
                        slug,
                        title
                    },
                    startWatchDate,
                    endWatchDate
                },
                onHold {
                    anime {
                        id,
                        slug,
                        title
                    },
                    startWatchDate,
                    endWatchDate
                },
                planTo {
                    anime {
                        id,
                        slug,
                        title
                    },
                    startWatchDate,
                    endWatchDate
                }
            }
        }
    }
    `

    const variables = { 'profileID' : profileID};

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