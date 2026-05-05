import { Media } from "./base";
import { z } from 'zod';
import { User } from "./user";

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
    id: number,
    game: AsobuGame,
    user: User,
    status: number,
    score: number,
    note: string,
    review: string,
    startPlayDate: string,
    endPlayDate: string,
    updateAt: string,
    createdAt: string
}

export type GameListEntryStatus = 'playing' | 'completed' | 'onHold' | 'planTo' | 'replaying'

export const GameListEntryMetadataSchema = z.object({
    score: z.number().min(-1).max(10).optional(),
    note: z.string().nullable(),
    review: z.string().nullable(),
    startPlayDate: z.date().nullable(),
    endPlayDate: z.date().nullable()
})

export type GameListEntryMetadata = z.infer<typeof GameListEntryMetadataSchema>;