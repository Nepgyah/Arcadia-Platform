import { Franchise, Media } from "./base";

interface Rankings {
    rankScore: number,
    rankPopular: number
}

export interface Anime extends Media {
    titleNative: string,
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
    airingEndDate: string,
    malData: Rankings,
    anilistdata: Rankings
}

export interface AnimeEpisode {
    id: number,
    number: number,
    title: string,
    description: string,
    coverImgUrl: string
}

export interface AnimeListEntry {
    anime: Anime,
    score: number,
    startWatchDate: string,
    endWatchDate: string
}