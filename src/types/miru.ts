import { Media } from "./media";

export interface Anime extends Media {
    anilistData: {
        rankScore: number;
        rankPopular: number
    },
    malData: {
        rankScore: number,
        rankPopular: number
    }
}