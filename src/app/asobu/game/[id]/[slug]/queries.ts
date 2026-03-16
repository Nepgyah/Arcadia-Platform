import { arcadiaAPI } from "@/utils/api/arcadiaAPI"

export async function FetchGame(id: string) {
    const query =
    `
    query {
        gameById(id: ${id}) {
            id,
            title,
            slug,
            esrbRating,
            pegiRating,
            tags {
                name
            },
            genres {
                name
            }
            publishers {
                name
            }
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.gameById
}

export async function FetchCharacters(id: string) {
    const query = 
    `
    query {
        charactersByGame(id: ${id}) {
            id,
            character {
                id,
                firstName,
                lastName,
                voiceActor {
                id
                firstName,
                lastName
                },
            },
            role,
            isPlayable
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
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

    const response = await arcadiaAPI.GraphQL<any>(query);
    return response.data.franchiseByGame
}