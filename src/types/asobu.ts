import { Media } from "./base";

export interface AsobuGame extends Media {
    trailerUrl : string,
    status: string,
    tags: string[],
    genres: string[],
    esrbRating: string,
    pegiRating: string,
    prequel: AsobuGame,
    sequels: AsobuGame[],
    characterRelations: [],
    developers: any[],
    publishers: any[],
    platforms: any[],
    steam_id: number,
}

export interface GameListEntry {
    game: AsobuGame,
    status: number,
    score: number,
    note: string,
    review: string,
    startPlayDate: string,
    endPlayDate: string,
    updateAt: string,
    createdAt: string
}