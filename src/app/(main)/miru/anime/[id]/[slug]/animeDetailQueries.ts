import { arcadiaAPI } from "@/utils/api/arcadiaAPI"

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

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.animeById
}

export async function GetAnimeCharacters(id: string) {
    const query = 
    `
    query {
        charactersByAnime(id:1) {
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