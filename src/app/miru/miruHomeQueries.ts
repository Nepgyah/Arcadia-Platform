import { arcadiaAPI } from "@/lib/api/arcadiaAPI"

export async function GetRatedAnime() {
    const query = 
    `
    query {
        miru {
            animes (
                sort: {
                    category: "score",
                    direction: "desc"
                },
                pagination: {
                    perPage: 5,
                    targetPage: 1
                }
                ) {
                results {
                    id,
                    title,
                    slug,
                    coverImageUrl
                }
            }
        }
    }
    `

    const res = await arcadiaAPI.GraphQL<any>(query)
    return res.data.miru.animes.results
}

export async function GetPopularAnime() {
    const query = 
    `
    query {
        miru {
            animes (
                sort: {
                    category: "users",
                    direction: "desc"
                },
                pagination: {
                    perPage: 5,
                    targetPage: 1
                }
                ) {
                results {
                    id,
                    title,
                    slug,
                    coverImageUrl
                }
            }
        }
    }
    `

    const res = await arcadiaAPI.GraphQL<any>(query)
    return res.data.miru.animes.results
}