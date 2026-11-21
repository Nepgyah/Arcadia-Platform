import { arcadiaAPI } from "@/lib/api/baseAPI";
import { Character, MediaCharacter } from "@/types/base";
import { Media } from "@/types/media";
import { Anime } from "@/types/miru";

interface GetAnimeResponse {
    miru: {
        anime: Anime
    }
}
export async function GetAnimeAction(animeID: number) {
    const query = `
        query ($animeID: Int!) {
            miru {
                anime(pk: $animeID) {
                    id,
                    title,
                    status,
                    slug,
                    bgImageUrl,
                    bannerImageUrl,
                    franchise { id },
                    anilistData {
                        rankScore,
                        rankPopular
                    },
                    malData {
                        rankScore,
                        rankPopular,
                    },
                    users,
                    rating,
                }
            }
        }
    `
    const variables = { animeID: animeID }

    const response = await arcadiaAPI.GRAPHQL<GetAnimeResponse | null>(query, variables)
    return response
}

interface GetAnimeCharactersResponse {
    miru: {
        anime: {
            cast: MediaCharacter[]
        }
    }
}

export async function GetAnimeCharactersAction(animeID: number) : Promise<MediaCharacter[] | []> {
    const query = `
        query ($animeID: Int!) {
            miru {
                anime(pk: $animeID) {
                    cast {
                        character {
                            id,
                            slug,
                            firstName,
                            lastName,
                            fullName,
                            nicknames,
                            coverImageUrl,
                            quote
                        },
                        role,
                        enVoiceActor {
                            id,
                            slug,
                            coverImageUrl,
                            fullName
                        },
                        jaVoiceActor {
                            id,
                            slug,
                            coverImageUrl,
                            fullName
                        }
                    }
                }
            }
        }
    `
    const variables = { animeID: animeID }

    const response = await arcadiaAPI.GRAPHQL<GetAnimeCharactersResponse | null>(query, variables)
    return response?.miru.anime.cast ?? []
}