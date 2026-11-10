'use server';

import { arcadiaAPI } from "@/lib/api/baseAPI";
import { Media } from "@/types/media";
import DelayAwait from "@/utils/delayAwait";

interface AnimeListResponse {
    miru: {
        animes: {
            results: Media[]
        }
    }
}

export async function fetchAnimesAction() {
    const query = 
    `
    query {
        miru {
            animes(sort: {
                category: "score",
                direction: "desc"
            },
            pagination: {
                perPage: 5,
                targetPage: 1
            }) {
                results {
                    id,
                    title,
                    slug,
                    coverImageUrl,
                    score
                }
            }
        }
    }
    `

    const response = await arcadiaAPI.GRAPHQL<AnimeListResponse>(query)
    return response.miru.animes.results
}

interface GameListResponse {
    asobu: {
        games: {
            results: Media[]
        }
    }
}

export async function fetchGamesAction() {
    const query = 
    `
        query {
            asobu {
                games(sort: {
                    category: "score",
                    direction: "desc"
                },
                pagination: {
                    perPage: 5,
                    targetPage: 1
                }) {
                    results {
                        id,
                        title,
                        slug,
                        score,
                        coverImageUrl
                    }
                }
            }
        }
    `

    const response = await arcadiaAPI.GRAPHQL<GameListResponse>(query)
    return response.asobu.games.results
}