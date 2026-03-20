import { Franchise, Media } from "./base";

export interface Anime extends Media {
    titleJa: string,
    bannerImgUrl: string,
    coverImgUrl: string,
    season: string,
    status: string,
    type: string,
    rating: string,
    genres: string[],
    studio: any[],
    producer: any[]
    prequel: Anime,
    sequels: Anime[],
    latestEpisode: AnimeEpisode,
    episodeCount: number,
    airingStartDate: string,
    airingEndDate: string
}

export interface AnimeEpisode {
    id: number,
    number: number,
    title: string,
    description: string
}