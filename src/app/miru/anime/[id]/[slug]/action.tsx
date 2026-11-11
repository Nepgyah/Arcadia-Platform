import { arcadiaAPI } from "@/lib/api/baseAPI";
import { Media } from "@/types/media";

interface GetAnimeResponse {
    miru: {
        anime: Media | null
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
                    bannerImageUrl
                }
            }
        }
    `
    const variables = { animeID: animeID }

    const response = await arcadiaAPI.GRAPHQL<GetAnimeResponse>(query, variables)
    return response
}