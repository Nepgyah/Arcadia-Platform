import { arcadiaServerFetch } from "@/utils/api/arcadia/arcadiaServer"

export async function FetchGame(id: string) {
    const query =
    `
    query {
        gameById(gameId: ${id}) {
            id,
            title,
            slug,
            score,
            users,
            summary,
            esrbRating,
            pegiRating,
            trailerUrl,
            tags {
                name
            },
            genres {
                name
            }
            publishers {
                name
            },
            platforms {
                platform {
                    name
                },
                releaseDate
            },
            prequel {
                id,
                title,
                slug
            },
            sequels {
                id,
                title,
                slug
            }
        }
    }
    `

    const response = await arcadiaServerFetch.GraphQL<any>(query)
    return response.data.gameById
}

export async function FetchCharacters(id: string) {
    const query = 
    `
    query {
        charactersByGame(gameId: ${id}) {
            id,
            character {
                id,
                firstName,
                lastName,
                coverImgUrl
                voiceActor {
                    id
                    firstName,
                    lastName,
                    slug,
                    coverImgUrl
                },
            },
            role,
            isPlayable
        }
    }
    `

    const response = await arcadiaServerFetch.GraphQL<any>(query)
    return response.data.charactersByGame
}

export async function FetchFranchise(id: string) {
    const query =
    `
        query {
            franchiseByGame(id: ${id}) {
                id,
                name,
                slug,
                socials
            }
        }
    `

    const response = await arcadiaServerFetch.GraphQL<any>(query);
    return response.data.franchiseByGame
}

export async function FetchDLC(id: string) {
    const query =
    `
        query {
            dlcByGame(gameId: ${id}) {
                id,
                title
            }
        }
    `

    const response = await arcadiaServerFetch.GraphQL<any>(query);
    return response.data.dlcByGame
}