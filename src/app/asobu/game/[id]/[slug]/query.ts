import { arcadiaAPI } from "@/lib/api/arcadiaAPI"
import { GraphqlResponse } from "@/types/api"
import { AsobuGame } from "@/types/asobu"

interface GameDetailQuery  {
    asobu: {
        game: AsobuGame
    }
}
export async function FetchGame(id: string) {
    const query =
    `
    query($gameID: Int!) {
        asobu {
            game(pk: $gameID) {
                id,
                title,
                slug,
                score,
                users,
                summary,
                esrbRating,
                pegiRating,
                trailerUrl,
                bannerImageUrl,
                bgImageUrl,
                franchise {
                    id
                },
                tags {
                    name
                },
                genres {
                    name
                }
                publishers {
                    name
                },
                release {
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
    }
    `
    const variables = { gameID: Number(id)}
    const response = await arcadiaAPI.GraphQL<GraphqlResponse<GameDetailQuery>>(query, variables)
    return response.data.asobu.game
}

export async function FetchCharacters(id: number) {
    const query = 
    `
    query ($gameID: Int!) {
        asobu {
            game(pk: $gameID) {
                cast {
                    character {
                        id,
                        coverImgUrl,
                        fullName
                    },
                    voiceActor {
                        id,
                        fullName,
                        slug,
                        coverImgUrl
                    },
                    role
                }
            }
        }
    }
    `
    const variables = { gameID: id}
    const response = await arcadiaAPI.GraphQL<GraphqlResponse<GameDetailQuery>>(query, variables)
    return response.data.asobu.game.cast
}

export async function FetchReviews(id: string) {
    const query =
    `
    query ($gameID: ID!) {
        gameReviews(gameId: $gameID) {
            user {
                id,
                username,
                picturePreset
            },
            text,
            updatedAt
        }
    }
    `

    const variables = {
        gameID: id
    }

    const response = await arcadiaAPI.GraphQL<any>(query, variables);
    return response.data.gameReviews
}

export async function FetchFranchise(id: number) {
    const query =
    `
    query($franchiseID: Int!) {
        base {
            franchise(pk: $franchiseID) {
                id,
                name,
                slug,
                socials,
                coverImage
            }
        }
    }
    `
    const variables = { franchiseID: id}
    const response = await arcadiaAPI.GraphQL<any>(query, variables);
    return response.data.base.franchise
}

export async function FetchDLC(id: number) {
    const query =
    `
    query ($gameID: Int!) {
        asobu {
            game(pk: $gameID) {
                dlc {
                    id,
                    title,
                    score
                }
            }
        }
    }
    `
    const variables = { gameID: id}
    const response = await arcadiaAPI.GraphQL<any>(query, variables);
    return response.data.asobu.game.dlc
}