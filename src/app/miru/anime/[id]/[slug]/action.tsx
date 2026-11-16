import { arcadiaAPI } from "@/lib/api/baseAPI";
import { Media } from "@/types/media";

interface GetAnimeResponse {
    miru: {
        anime: Media
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
                }
            }
        }
    `
    const variables = { animeID: animeID }

    const response = await arcadiaAPI.GRAPHQL<GetAnimeResponse | null>(query, variables)
    return response
}