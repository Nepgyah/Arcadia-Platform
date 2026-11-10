import { arcadiaAPI } from "@/lib/api/baseAPI";
import { Media } from "@/types/media";

export async function GetAnimeAction(animeID: number) {
    const query = `
        query ($animeID: Int!) {
            miru {
                anime(pk: $animeID) {
                    id,
                    title,
                    status,
                    slug,
                    bgImageUrl
                }
            }
        }
    `
    const variables = { animeID: animeID }

    const response = await arcadiaAPI.GRAPHQL<Media>(query, variables)
    console.log(response)
}