import { Franchise, Media } from "./base";

export interface Anime extends Media {
    titleJa: string,
    season: string,
    status: string,
    type: string,
    rating: string,
    genres: string[],
    studio: string,
    prevAnime: {
        anime: Anime
    }
    nextAnime: {
        anime: Anime
    }
}