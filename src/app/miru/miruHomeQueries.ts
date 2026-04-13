import { arcadiaAPI } from "@/utils/api/arcadiaAPI"

export async function GetRatedAnime() {
    const query = 
    `
    query {
        animeByCategory(category: "score", count: 5) {
            id,
            title,
            slug,
            coverImgUrl
        }
    }
    `

    const res = await arcadiaAPI.GraphQL<any>(query)
    return res.data.animeByCategory
}

export async function GetPopularAnime() {
    const query = 
    `
    query {
        animeByCategory(category: "users", count: 5) {
            id,
            title,
            slug,
            coverImgUrl
        }
    }
    `

    const res = await arcadiaAPI.GraphQL<any>(query)
    return res.data.animeByCategory
}