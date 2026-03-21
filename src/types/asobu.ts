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