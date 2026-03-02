import { Anime } from "@/types/miru"
import { arcadiaAPI } from "@/utils/api/arcadiaAPI"
import { sleep } from "@/utils/testing/wait"

interface AnimeDetailsQuery {
    data: {
        animeById: Anime
    }
}

export async function GetAnime(id: string) {
    const query =
    `
    query {
        animeById(id:${id}) {
            id,
            title,
            titleJa,
            score,
            users,
            summary,
            type,
            status,
            rating,
            season,
            genres {
                name
            },
            studio,
            prevAnime{
                anime {
                    id,
                    title,
                    slug
                },
                relationType
            },
            nextAnime {
                anime {
                    id,
                    title,
                    slug
                },
                relationType
            }
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<AnimeDetailsQuery>(query)
    await sleep(3)
    return response.data.animeById
}

export async function GetAnimeListEntry(userID: number, animeID: number) {
    const query =
    `
    query {
        getAnimeListEntry(userId: ${userID}, animeId: ${animeID}) {
            status,
            currentEpisode,
            startWatchDate,
            endWatchDate,
            score
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.getAnimeListEntry
}

export async function GetAnimeCharacters(id: string) {
    const query = 
    `
    query {
        charactersByAnime(id:${id}) {
            character {
                id,
                firstName,
                lastName,
                voiceActor {
                    id,
                    firstName,
                    lastName
                }
            },
            role
        }
    }
    `
    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.charactersByAnime
}

export async function GetAnimeFranchise(id: string) {
    const query = 
    `
    query {
        franchiseByAnime(id:${id}) {
            id,
            name,
            socials
        }
    }
    `
    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.franchiseByAnime
}