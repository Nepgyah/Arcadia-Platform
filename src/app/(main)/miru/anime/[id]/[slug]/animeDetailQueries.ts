import { arcadiaAPI } from "@/utils/api/arcadiaAPI"

export async function GetAnime(id: string) {
    const query =
    `
    query {
        animeById(id:${id}) {
            title,
            score,
            users,
            summary,
            titleJa,
            season,
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.animeById
}