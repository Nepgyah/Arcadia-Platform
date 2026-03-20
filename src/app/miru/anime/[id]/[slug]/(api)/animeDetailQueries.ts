import { Anime } from "@/types/miru"
import { arcadiaAPI } from "@/utils/api/arcadiaAPI"

interface AnimeDetailsQuery {
    data: {
        animeById: Anime
    }
}

export async function GetAnime(id: string) {
    const query =
    `
    query {
        animeById(animeId: ${id}) {
            id,
            title,
            bannerImgUrl,
            coverImgUrl,
            score,
            users,
            summary,
            type,
            status,
            rating,
            season,
            episodeCount,
            airingStartDate,
            airingEndDate,
            genres {
                name
            },
            producer {
                name
            }
            studio {
              name
            },
            prequel {
                id,
              	title,
              	slug,
                coverImgUrl,
            },
            sequels {
                id,
                title,
                slug,
                coverImgUrl,
            },
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<AnimeDetailsQuery>(query)
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
        charactersByAnime(animeId:${id}) {
            character {
                id,
                fullName,
                coverImgUrl,
                voiceActor {
                    id,
                    firstName,
                    lastName,
                    slug,
                    coverImgUrl
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

export async function GetAnimeEpisodes(id: string) {
    const query =
    `
    query {
        getAnimeEpisodes(animeId: ${id}) {
            id,
            title,
            number,
            description
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.getAnimeEpisodes
}