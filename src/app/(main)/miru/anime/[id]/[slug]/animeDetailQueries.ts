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
            }
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<AnimeDetailsQuery>(query)
    return response.data.animeById
}

export async function GetAnimeCharacters(id: string) {
    const query = 
    `
    query {
        charactersByAnime(id:${id}) {
            character {
                id,
                firstName,
                lastName
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
            name
        }
    }
    `
    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.franchiseByAnime
}