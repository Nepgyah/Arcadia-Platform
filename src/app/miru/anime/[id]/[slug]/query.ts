import { Anime } from "@/types/miru"
import { arcadiaAPI } from "@/lib/api/arcadiaAPI"

interface AnimeDetailsQuery {
    data: {
        miru: {
            anime: Anime
        }
    }
}

export async function GetAnime(id: string) {
    const query =
    `
    query($pk: Int!) {
        miru {
            anime(pk: $pk) {
                id,
                title,
                titleNative,
                score,
                users,
                slug,
                bannerImageUrl,
                coverImageUrl,
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
                bgImageUrl,
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
                    coverImageUrl,
                },
                sequels {
                    id,
                    title,
                    slug,
                    coverImageUrl,
                },
                malData {
                    rankScore,
                    rankPopular
                },
                anilistData {
                    rankScore,
                    rankPopular
                },
                franchise {
                    id
                }
            }
        }
    }
    `
    const variables = { 'pk': Number(id) }
    const response = await arcadiaAPI.GraphQL<AnimeDetailsQuery>(query, variables)
    return response.data.miru.anime
}

export async function GetAnimeCharacters(id: string) {
    const query =
    `
    query($pk: Int!) {
        miru {
            anime(pk: $pk) {
                cast {
                    character {
                        id,
                        coverImageUrl,
                        fullName
                    },
                    voiceActor {
                        id,
                        fullName,
                        slug,
                        coverImageUrl
                    },
                    role
                }
            }
        }
    }
    `

    const variables = { "pk": Number(id) }
    const response = await arcadiaAPI.GraphQL<any>(query, variables)
    return response.data.miru.anime.cast
}

// export async function GetAnimeFranchise(id: number) {
//     const query = 
//     `
//     query($pk: Int!) {
//         base {
//             franchise(pk: $pk) {
//                 id,
//                 name,
//                 socials,
//                 coverImage
//             }
//         }
//     }
//     `
//     const variables = { "pk": Number(id) }
//     const response = await arcadiaAPI.GraphQL<any>(query, variables)
//     return response.data.base.franchise
// }

export async function GetAnimeFranchise(id: number) {
    const query = 
    `
    query($pk: Int!) {
        base {
            franchise(pk: $pk) {
                id,
                name,
                socials,
                coverImage
            }
        }
    }
    `
    const variables = { "pk": Number(id) }
    const response = await arcadiaAPI.GraphQL<any>(query, variables)
    return response.data.base.franchise
}

export async function GetAnimeEpisodes(id: string) {
    const query =
    `
    query($pk: Int!) {
        miru {
            anime(pk: $pk) {
                episodes {
                    id,
                    title,
                    number,
                    coverImageUrl,
                    url
                }
            }
        }
    } 
    `
    const variables = { "pk": Number(id) }
    const response = await arcadiaAPI.GraphQL<any>(query, variables)
    return response.data.miru.anime.episodes
}