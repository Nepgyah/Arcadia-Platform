import { Media } from "./base";

export interface AsobuGame extends Media {
    trailer_url : string,
    status: string,
    tags: string[],
    genres: string[],
    esrbRating: string,
    pegiRating: string,
    developers: any[],
    publishers: any[],
    characterRelations: [],
    steam_id: number
}