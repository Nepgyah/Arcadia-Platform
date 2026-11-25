import { Company } from "./base";
import { Media } from "./media";

export interface Anime extends Media {
    titleNative: string,
    status: string,
    type: string,
    season: string,
    rating: string,
    airingStartDate: string,
    airingEndDate: string,
    producer: Company[],
    studio: Company[],
    anilistData: {
        rankScore: number;
        rankPopular: number
    },
    malData: {
        rankScore: number,
        rankPopular: number
    },
    prequel: Anime,
    sequels: Anime[]
}