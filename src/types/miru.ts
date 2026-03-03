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
    },
    latestEpisode: AnimeEpisode
}

export interface AnimeEpisode {
    id: number,
    number: number,
    title: string,
    description: string
}